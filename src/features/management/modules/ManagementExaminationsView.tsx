import React, { useState } from 'react';
import {
  Award,
  Calendar,
  CheckCircle2,
  Download,
  AlertTriangle,
  Send,
  Users,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';

export const ManagementExaminationsView: React.FC = () => {
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
    toast(`Internal marks for ${selectedCourse} updated to ${marks}/40. Student grade report updated!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <Award className="w-4 h-4" />
              <span>Controller of Examinations</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Examination Schedules, Seating &amp; Results</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Coordinate mid-term and semester finals, manage hall allocations, moderate internal evaluations, and publish grade reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsResultsPublished(!isResultsPublished);
                toast(
                  !isResultsPublished ? 'Official examination results published.' : 'Results withheld.',
                  !isResultsPublished ? 'success' : 'info'
                );
              }}
              className="text-xs font-semibold"
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              <span>{isResultsPublished ? 'Revoke Publication' : 'Publish Results Live'}</span>
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsModerateModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Moderate Internal Marks</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Exam Board Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Active Examination Timetable</h2>
            <p className="text-xs text-slate-500">Synced directly with the student Exam Board</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toast('Generating official examination admit cards for 3,480 students...', 'info')}
            className="text-xs font-semibold gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Generate Hall Tickets</span>
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold">
              <tr>
                <th className="py-2.5 px-3 rounded-l-lg">Course Code &amp; Exam Name</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3">Venue / Hall</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {exams.map((ex) => (
                <tr key={ex.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-900">{ex.courseCode}</p>
                    <p className="text-[11px] text-slate-500">{ex.examName}</p>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-800">{ex.date}</td>
                  <td className="py-3 px-3 text-slate-600">{ex.time}</td>
                  <td className="py-3 px-3 font-medium text-slate-700">{ex.location}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ex.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      }`}
                    >
                      {ex.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toast(`Seating plan downloaded for ${ex.courseCode}.`, 'info')}
                      className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Roster</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Moderation Modal */}
      {isModerateModalOpen && (
        <Modal
          isOpen={isModerateModalOpen}
          onClose={() => setIsModerateModalOpen(false)}
          title="Moderate Internal Marks"
          description="Adjust continuous internal marks for student Merna Vance (UTP-2023-4182). This immediately updates their official Grade Report."
          maxWidth="md"
        >
          <form onSubmit={handleModerateMarks} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Target Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsModerateModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1">
                <Send className="w-3.5 h-3.5" />
                <span>Save &amp; Update Grade Report</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
