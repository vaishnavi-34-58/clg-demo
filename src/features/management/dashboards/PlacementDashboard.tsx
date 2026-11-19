import React, { useState } from 'react';
import {
  Briefcase,
  Building2,
  TrendingUp,
  CheckCircle2,
  Plus,
  ArrowRight,
  Send,
  Users,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';
import { APP_ROUTES } from '../../../app/routes';

export const PlacementDashboard: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { placements, createPlacementDrive, updatePlacementApplicantStatus } = useErp();
  const { toast } = useToast();

  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [packageAmount, setPackageAmount] = useState('$115,000 / yr');
  const [minCgpa, setMinCgpa] = useState(3.5);
  const [deadline, setDeadline] = useState('March 15, 2024');

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

  const handleUpdateStatus = (driveId: string, company: string) => {
    updatePlacementApplicantStatus(driveId, 'Interview Scheduled');
    toast(`Merna Vance status updated to "Interview Scheduled" for ${company}!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-7 text-white shadow-lg border border-blue-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
            DR. RACHEL GREEN • HEAD OF CORPORATE RELATIONS &amp; PLACEMENTS
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-2">Campus Recruitment &amp; Career Hub</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Corporate partnership pipelines, recruitment drives, candidate shortlisting, on-campus interview schedules, and official offer letters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsDriveModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-xs font-semibold gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Launch Campus Drive</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Active Drives</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{placements.length}</span>
          <span className="text-[10px] text-blue-600 font-semibold block">Visible on Student Portal</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Partner Corporations</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-blue-600">142</span>
          <span className="text-[10px] text-slate-500 font-semibold block">Tier-1 Tech &amp; Design Firms</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Average Compensation</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">$118,500</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">+12.8% vs Last Year</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Batch Placement Rate</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">92.4%</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">Class of 2024</span>
        </div>
      </div>

      {/* Drives & Shortlisting */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Active Campus Recruitment Drives</h2>
              <p className="text-xs text-slate-500">Drives added here appear immediately on the student Placements page</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(APP_ROUTES.MANAGEMENT_PLACEMENTS)}
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Company &amp; Role</th>
                  <th className="py-2.5 px-3">CTC / Compensation</th>
                  <th className="py-2.5 px-3">Eligibility</th>
                  <th className="py-2.5 px-3">Deadline</th>
                  <th className="py-2.5 px-3">Drive Status</th>
                  <th className="py-2.5 px-3 text-right rounded-r-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {placements.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">{d.company || d.companyName}</p>
                      <p className="text-[11px] text-slate-500">{d.role}</p>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-800">{d.ctc}</td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-slate-700">CGPA &ge; {d.minCgpa}</span>
                      <span className="text-[10px] text-slate-400 block">{d.eligibleBranches.join(', ')}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{d.deadline || d.applicationDeadline}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          d.status === 'Open' || d.status === 'Eligible'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUpdateStatus(d.id, d.company || d.companyName)}
                        className="text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 py-1 px-2.5"
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

        {/* Shortlist Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>Student Application Snapshot</span>
            </h2>
            <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Student:</span>
                <span className="font-semibold text-slate-800">Merna Vance (UTP-2023-4182)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">CGPA:</span>
                <span className="font-bold text-emerald-600">3.85 / 4.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Eligible Drives:</span>
                <span className="font-semibold text-slate-800">All 3 Active Drives</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => toast('Exported placement resume bundle for Top 10% students.', 'info')}
              className="text-xs font-semibold gap-1.5"
            >
              <Briefcase className="w-3.5 h-3.5 text-blue-600" />
              <span>Export Resumes to Recruiters</span>
            </Button>
          </div>

          <div className="bg-blue-50/70 rounded-2xl border border-blue-200/80 p-5 space-y-2">
            <div className="flex items-center gap-2 text-blue-950 font-bold text-xs">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Upcoming On-Campus Day</span>
            </div>
            <p className="text-[11px] text-blue-900/80">
              Annual CampusOne Tech &amp; Design Career Fair scheduled for March 22 in Central Auditorium. 45 recruiting teams attending in person.
            </p>
          </div>
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Application Deadline</label>
                <input
                  type="text"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsDriveModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-blue-600 hover:bg-blue-700 text-white gap-1">
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
