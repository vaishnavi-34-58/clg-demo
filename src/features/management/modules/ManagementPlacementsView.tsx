import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Send,
  Search,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';

export const ManagementPlacementsView: React.FC = () => {
  const { placements, createPlacementDrive, updatePlacementApplicantStatus } = useErp();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [packageAmount, setPackageAmount] = useState('$115,000 / yr');
  const [minCgpa, setMinCgpa] = useState(3.5);
  const [deadline, setDeadline] = useState('March 15, 2024');

  const filteredDrives = placements.filter((d) => {
    const q = searchQuery.toLowerCase();
    return (
      (d.company || d.companyName).toLowerCase().includes(q) ||
      d.role.toLowerCase().includes(q)
    );
  });

  const handleCreateDrive = (e: React.FormEvent) => {
    e.preventDefault();
    createPlacementDrive({
      companyName,
      company: companyName,
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
      role: roleTitle,
      ctc: packageAmount,
      minCgpa,
      applicationDeadline: deadline,
      deadline,
      status: 'Open',
      eligibleBranches: ['Computer Science', 'Interactive Design', 'Information Systems'],
      description: `Exciting opening at ${companyName} for graduating seniors. Comprehensive healthcare and relocation allowance included.`,
    });
    setIsDriveModalOpen(false);
    setCompanyName('');
    setRoleTitle('');
    toast(`Placement drive for ${companyName} created and posted to Student Portal!`, 'success');
  };

  const handleScheduleInterview = (driveId: string, company: string) => {
    updatePlacementApplicantStatus(driveId, 'Interview Scheduled');
    toast(`Merna Vance status updated to "Interview Scheduled" for ${company}!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <Briefcase className="w-4 h-4" />
              <span>Career &amp; Corporate Partnerships</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Campus Placement Drives &amp; Recruiters</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Publish campus recruitment opportunities, evaluate candidate eligibility cutoffs, schedule interviews, and track placement statistics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsDriveModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Post New Recruitment Drive</span>
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-5 flex items-center gap-3 pt-4 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search active recruitment drives by company or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Drives Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Recruiting Enterprise</th>
                <th className="py-3 px-4">Role Designation</th>
                <th className="py-3 px-4">Package / CTC</th>
                <th className="py-3 px-4">Minimum Cutoff</th>
                <th className="py-3 px-4">Application Deadline</th>
                <th className="py-3 px-4">Drive Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDrives.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{d.company || d.companyName}</p>
                    <p className="text-[11px] text-slate-400">Campus Partner</p>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">{d.role}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{d.ctc}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">CGPA &ge; {d.minCgpa}</td>
                  <td className="py-3.5 px-4 text-slate-600">{d.deadline || d.applicationDeadline}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        d.status === 'Open' || d.status === 'Eligible'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleScheduleInterview(d.id, d.company || d.companyName)}
                      className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 py-1 px-2.5"
                    >
                      Schedule
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Launch Drive Modal */}
      {isDriveModalOpen && (
        <Modal
          isOpen={isDriveModalOpen}
          onClose={() => setIsDriveModalOpen(false)}
          title="Launch New Campus Recruitment Drive"
          description="Create and broadcast an official campus placement opportunity. This immediately appears in the Student Portal."
          maxWidth="md"
        >
          <form onSubmit={handleCreateDrive} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Company / Organization Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                placeholder="e.g. Adobe Systems, Spotify, Google"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Designation / Role Title</label>
                <input
                  type="text"
                  value={roleTitle}
                  onChange={(e) => setRoleTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                  placeholder="e.g. UX Designer I"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Compensation / Package</label>
                <input
                  type="text"
                  value={packageAmount}
                  onChange={(e) => setPackageAmount(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. $125,000 / yr"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Minimum CGPA Cutoff</label>
                <input
                  type="number"
                  step="0.1"
                  min="2.0"
                  max="4.0"
                  value={minCgpa}
                  onChange={(e) => setMinCgpa(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Application Deadline</label>
                <input
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsDriveModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1">
                <Send className="w-3.5 h-3.5" />
                <span>Launch &amp; Publish to Students</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
