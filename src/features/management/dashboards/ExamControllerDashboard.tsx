import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Send,
  Download,
  Users,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';
import { APP_ROUTES } from '../../../app/routes';

export const ExamControllerDashboard: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { exams, results, updateInternalMarks } = useErp();
  const { toast } = useToast();

  const [isModerateModalOpen, setIsModerateModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('ART101');
  const [marks, setMarks] = useState(38);
  const [isResultsPublished, setIsResultsPublished] = useState(true);

  const handleModerateMarks = (e: React.FormEvent) => {
    e.preventDefault();
    updateInternalMarks(3, selectedCourse, marks);
    setIsModerateModalOpen(false);
    toast(`Marks for ${selectedCourse} updated to ${marks}/40. Student grade reports updated!`, 'success');
  };

  const handleTogglePublish = () => {
    setIsResultsPublished(!isResultsPublished);
    toast(
      !isResultsPublished
        ? 'Semester III Official Examination Results Published to Student Portal.'
        : 'Semester III Results withheld for revision.',
      !isResultsPublished ? 'success' : 'info'
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-7 text-white shadow-lg border border-purple-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            DR. VICTOR HELM • OFFICE OF THE CONTROLLER OF EXAMINATIONS
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-2">Examination &amp; Assessment Control Center</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Mid-term and end-semester timetabling, question paper distribution, hall tickets, internal moderation, and official grade publishing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleTogglePublish}
            className={`text-xs font-semibold ${
              isResultsPublished
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
                : 'border-amber-500/50 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            <span>{isResultsPublished ? 'Results Live (Click to Revoke)' : 'Publish Results Live'}</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsModerateModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-500 text-xs font-semibold gap-1.5"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Moderate Internal Marks</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Scheduled Exams</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{exams.length}</span>
          <span className="text-[10px] text-slate-500 font-semibold block">Semester III Winter Session</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Hall Tickets Released</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-purple-600">3,480</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">100% Eligible Students</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Published Results</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">{isResultsPublished ? 'Published' : 'Withheld'}</span>
          <span className="text-[10px] text-slate-500 font-semibold block">Synced to Student Portal</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Grievance / Revaluation</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-600">4</span>
          <span className="text-[10px] text-amber-600 font-semibold block">Under Committee Review</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exam Schedule Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Current Semester Examination Board</h2>
              <p className="text-xs text-slate-500">Live view of examinations synced with the Student Portal Exam Board</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(APP_ROUTES.MANAGEMENT_EXAMINATIONS)}
              className="text-xs text-purple-600 hover:text-purple-700 font-semibold gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Course</th>
                  <th className="py-2.5 px-3">Date &amp; Time</th>
                  <th className="py-2.5 px-3">Venue / Hall</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {exams.map((ex) => (
                  <tr key={ex.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">{ex.courseCode}</p>
                      <p className="text-[11px] text-slate-500">{ex.examName}</p>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-medium text-slate-800">{ex.date}</p>
                      <p className="text-[11px] text-slate-400">{ex.time}</p>
                    </td>
                    <td className="py-3 px-3 font-medium text-slate-700">{ex.location}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          ex.status === 'Completed'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-purple-50 text-purple-700 border border-purple-200'
                        }`}
                      >
                        {ex.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => toast(`Downloading official roster for ${ex.courseCode}...`, 'info')}
                        className="text-slate-500 hover:text-purple-600 p-1 rounded hover:bg-slate-100"
                        title="Download Seating Plan"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Tools & Grade Moderation Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>Examination Session Info</span>
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Academic Session:</span>
                <span className="font-semibold text-slate-800">Winter 2023-2024</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Passing Threshold:</span>
                <span className="font-semibold text-slate-800">40% Aggregate</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Hall Ticket Policy:</span>
                <span className="font-semibold text-emerald-600">&ge;75% Attendance Required</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                onClick={() => toast('Hall ticket bulk release completed. 3,480 PDF admit cards generated.', 'success')}
                className="text-xs font-semibold gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-purple-600" />
                <span>Bulk Generate Hall Tickets</span>
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-indigo-50/60 rounded-2xl border border-purple-200/70 p-5 space-y-3">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-purple-600" />
              <span>Cross-Portal Grade Sync Status</span>
            </div>
            <p className="text-[11px] text-purple-950/80 leading-relaxed">
              When marks are finalized or moderated here, the Grade Report in the Student Portal updates immediately for Semester {results[0]?.semesterNumber || 3}.
            </p>
            <div className="text-[11px] font-mono bg-white/80 p-2 rounded-lg border border-purple-200 text-purple-800">
              Active SGPA: {results[0]?.sgpa || '3.86'} | Total Credits: {results[0]?.totalCredits || 16}
            </div>
          </div>
        </div>
      </div>

      {/* Moderation Modal */}
      {isModerateModalOpen && (
        <Modal
          isOpen={isModerateModalOpen}
          onClose={() => setIsModerateModalOpen(false)}
          title="Moderate Internal Marks"
          description="Adjust internal marks for student Merna Vance (UTP-2023-4182). This immediately updates their Grade Report."
          maxWidth="md"
        >
          <form onSubmit={handleModerateMarks} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Target Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="ART101">ART101 - Graphic Fundamentals</option>
                <option value="ITD201">ITD201 - Advanced Web Design</option>
                <option value="UXD301">UXD301 - User Experience Research</option>
                <option value="ANI301">ANI301 - 3D Animation Techniques</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">New Internal Marks (Max 40)</label>
              <input
                type="number"
                min="0"
                max="40"
                value={marks}
                onChange={(e) => setMarks(Number(e.target.value))}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-bold"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsModerateModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-purple-600 hover:bg-purple-700 text-white gap-1">
                <Send className="w-3.5 h-3.5" />
                <span>Save &amp; Sync to Portal</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
