import React, { useState } from 'react';
import {
  UserPlus,
  FileCheck2,
  Clock,
  CheckCircle2,
  Filter,
  ArrowRight,
  Eye,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';
import { Applicant } from '../../../types/management';
import { APP_ROUTES } from '../../../app/routes';

export const AdmissionsDashboard: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { admissions, approveAdmissionApplicant } = useErp();
  const { toast } = useToast();

  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredApplicants = admissions.filter((app) =>
    filterStatus === 'ALL' ? true : app.status === filterStatus
  );

  const handleApprove = (id: string, name: string) => {
    approveAdmissionApplicant(id);
    setSelectedApplicant(null);
    toast(`Applicant ${name} officially approved and admitted!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-emerald-950 rounded-2xl p-6 sm:p-7 text-white shadow-lg border border-teal-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
            DR. CAROLYN WOODS • DIRECTOR OF ADMISSIONS &amp; ENROLLMENT
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-2">Admissions &amp; Enrollment Hub</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Undergraduate &amp; postgraduate candidate pipelines, high school credential verification, entrance test rankings, and admission letter generation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate(APP_ROUTES.MANAGEMENT_ADMISSIONS)}
            className="bg-teal-600 hover:bg-teal-500 text-xs font-semibold gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Open Applicant Directory</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Total Applications</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">1,420</span>
          <span className="text-[10px] text-teal-600 font-semibold block">+18.4% vs 2023 Cohort</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Under Review</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-600">
            {admissions.filter((a) => a.status === 'UNDER_REVIEW' || a.status === 'SUBMITTED' || a.status === 'Pending Review' || a.status === 'Documents Verified').length}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold block">Awaiting Verification</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Admitted Students</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
            {admissions.filter((a) => a.status === 'APPROVED' || a.status === 'ENROLLED' || a.status === 'Approved').length}
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold block">Seat Fee Paid</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Enrollment Target</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">92%</span>
          <span className="text-[10px] text-teal-600 font-semibold block">550 / 600 Seats Filled</span>
        </div>
      </div>

      {/* Pipeline & Application Review */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Recent Candidate Pipeline</h2>
            <p className="text-xs text-slate-500">Inspect transcripts, entrance scores, and approve admission offers</p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="ALL">All Application Stages</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="APPROVED">Approved / Admitted</option>
              <option value="SUBMITTED">Submitted</option>
            </select>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(APP_ROUTES.MANAGEMENT_ADMISSIONS)}
              className="text-xs text-teal-600 hover:text-teal-700 font-semibold gap-1"
            >
              <span>Full Table</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold">
              <tr>
                <th className="py-2.5 px-3 rounded-l-lg">Applicant ID &amp; Name</th>
                <th className="py-2.5 px-3">Target Program</th>
                <th className="py-2.5 px-3">Previous Score</th>
                <th className="py-2.5 px-3">Applied Date</th>
                <th className="py-2.5 px-3">Stage</th>
                <th className="py-2.5 px-3 text-right rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApplicants.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-900">{app.name}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{app.id} • {app.email}</p>
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-medium text-slate-800">{app.appliedProgram || app.courseApplied}</p>
                    <p className="text-[11px] text-slate-500">{app.category}</p>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-800">{app.score || `${app.entranceScore || 85}% Merit`}</span>
                    <span className="text-[10px] text-slate-400 block">Entrance Merit</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{app.submittedDate || app.appliedDate}</td>
                  <td className="py-3 px-3">
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
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedApplicant(app)}
                        className="text-xs text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        <span>Review</span>
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

      {/* Review Candidate Modal */}
      {selectedApplicant && (
        <Modal
          isOpen={!!selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
          title={`Candidate Dossier: ${selectedApplicant.name}`}
          description={`Application Reference: ${selectedApplicant.id}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl">
              <div>
                <span className="text-slate-400 block text-[10px]">Candidate Email</span>
                <span className="font-semibold text-slate-900">{selectedApplicant.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Contact Number</span>
                <span className="font-semibold text-slate-900">{selectedApplicant.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Desired Degree</span>
                <span className="font-semibold text-slate-900">{selectedApplicant.appliedProgram || selectedApplicant.courseApplied}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Merit Percentile</span>
                <span className="font-semibold text-emerald-700">{selectedApplicant.score || `${selectedApplicant.entranceScore || 85}% Merit`}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-800">Uploaded Verification Documents</h4>
              <div className="space-y-1.5">
                {(selectedApplicant.documents || ['High School Diploma', 'Entrance Report']).map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg border border-slate-200">
                    <span className="font-medium text-slate-700 flex items-center gap-1.5">
                      <FileCheck2 className="w-3.5 h-3.5 text-teal-600" />
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
