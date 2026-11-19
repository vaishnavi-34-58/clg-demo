import React, { useState } from 'react';
import {
  UserPlus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  FileCheck2,
  Eye,
  ArrowRight,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';
import { Applicant } from '../../../types/management';

export const ManagementAdmissionsView: React.FC = () => {
  const { admissions, approveAdmissionApplicant } = useErp();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  const filteredApplicants = admissions.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.appliedProgram || app.courseApplied || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || app.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: string, name: string) => {
    approveAdmissionApplicant(id);
    setSelectedApplicant(null);
    toast(`Applicant ${name} officially approved and admitted!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <UserPlus className="w-4 h-4" />
              <span>Enrollment &amp; Admissions</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Applicant Directory &amp; Verification Pipeline</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review entrance exam percentiles, verify academic transcripts, issue provisional admission letters, and confirm seats.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search candidate by name, application ID, or program..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 font-medium"
            >
              <option value="ALL">All Application Stages</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="APPROVED">Approved / Admitted</option>
              <option value="SUBMITTED">Submitted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Applicant ID &amp; Name</th>
                <th className="py-3 px-4">Degree Applied</th>
                <th className="py-3 px-4">Entrance Score</th>
                <th className="py-3 px-4">Submitted Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApplicants.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{app.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{app.id} • {app.email}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-slate-800">{app.appliedProgram || app.courseApplied}</p>
                    <p className="text-[11px] text-slate-500">{app.category}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900">{app.score || `${app.entranceScore || 85}% Merit`}</span>
                    <span className="text-[10px] text-slate-400 block">Percentile</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{app.submittedDate || app.appliedDate}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        app.status === 'APPROVED' || app.status === 'Approved' || app.status === 'ENROLLED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : app.status === 'UNDER_REVIEW' || app.status === 'Pending Review' || app.status === 'Documents Verified'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {app.status === 'APPROVED' || app.status === 'Approved' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      <span>{app.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedApplicant(app)}
                        className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        <span>Inspect</span>
                      </Button>
                      {app.status !== 'APPROVED' && app.status !== 'Approved' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleApprove(app.id, app.name)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] py-1 px-2.5 h-auto"
                        >
                          Approve
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Dossier Modal */}
      {selectedApplicant && (
        <Modal
          isOpen={!!selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
          title={`Applicant Dossier: ${selectedApplicant.name}`}
          description={`Application Code: ${selectedApplicant.id}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
              <div>
                <span className="text-slate-400 block text-[10px]">Email</span>
                <span className="font-semibold text-slate-900">{selectedApplicant.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Phone</span>
                <span className="font-semibold text-slate-900">{selectedApplicant.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Desired Degree</span>
                <span className="font-semibold text-slate-900">{selectedApplicant.appliedProgram || selectedApplicant.courseApplied}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Entrance Score</span>
                <span className="font-semibold text-emerald-700">{selectedApplicant.score || `${selectedApplicant.entranceScore || 85}% Merit`}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-800">Verified Credentials</h4>
              <div className="space-y-1.5">
                {(selectedApplicant.documents || ['High School Diploma', 'SAT Report']).map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg border border-slate-200">
                    <span className="font-medium text-slate-700 flex items-center gap-1.5">
                      <FileCheck2 className="w-3.5 h-3.5 text-indigo-600" />
                      {doc}
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedApplicant(null)}>
                Close
              </Button>
              {selectedApplicant.status !== 'APPROVED' && selectedApplicant.status !== 'Approved' && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleApprove(selectedApplicant.id, selectedApplicant.name)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Issue Admission Letter</span>
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
