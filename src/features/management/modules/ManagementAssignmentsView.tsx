import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Send,
  Award,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';
import { HomeworkItem } from '../../../types/assignment';

export const ManagementAssignmentsView: React.FC = () => {
  const { homeworks, createAssignment, gradeHomework } = useErp();
  const { toast } = useToast();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('ART101');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [dueDate, setDueDate] = useState('Feb 28, 2024');
  const [points, setPoints] = useState(100);

  const [gradingHw, setGradingHw] = useState<HomeworkItem | null>(null);
  const [scoreToAssign, setScoreToAssign] = useState(95);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createAssignment({
      courseCode: selectedCourse,
      courseTitle: selectedCourse === 'ART101' ? 'Graphic Fundamentals' : 'Visual Communication Design',
      assignmentTitle,
      dueDate,
      points,
    });
    setIsCreateModalOpen(false);
    setAssignmentTitle('');
    toast(`Assignment "${assignmentTitle}" published to Student Portal!`, 'success');
  };

  const handleGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (gradingHw) {
      gradeHomework(gradingHw.id, scoreToAssign);
      setGradingHw(null);
      toast(`Graded "${gradingHw.assignmentTitle}" with ${scoreToAssign}/100 points!`, 'success');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Continuous Academic Evaluation</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Course Assignments &amp; Homeworks</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Publish design briefs, grade student submissions, track deadlines, and sync evaluations to the Student Portal.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Assignment</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Homeworks Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">Current Course Assignments</h2>
          <span className="text-xs text-slate-500 font-medium">{homeworks.length} total tasks</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold">
              <tr>
                <th className="py-2.5 px-3 rounded-l-lg">Course &amp; Title</th>
                <th className="py-2.5 px-3">Due Date</th>
                <th className="py-2.5 px-3">Max Points</th>
                <th className="py-2.5 px-3">Student Status</th>
                <th className="py-2.5 px-3">Awarded Score</th>
                <th className="py-2.5 px-3 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {homeworks.map((hw) => (
                <tr key={hw.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-900">{hw.assignmentTitle}</p>
                    <p className="text-[11px] text-slate-500">{hw.courseCode} • {hw.courseTitle}</p>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-800">{hw.dueDate}</td>
                  <td className="py-3 px-3 font-semibold text-slate-700">{hw.points || 100} pts</td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        hw.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : hw.status === 'In Progress'
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {hw.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900">
                    {hw.score !== undefined ? `${hw.score} / 100` : '—'}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setGradingHw(hw);
                        setScoreToAssign(hw.score || 95);
                      }}
                      className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 py-1 px-2.5"
                    >
                      Grade / Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Publish New Assignment"
          description="Create a coursework assignment. This appears immediately in the student's Homeworks view."
          maxWidth="md"
        >
          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
              >
                <option value="ART101">ART101 - Graphic Fundamentals</option>
                <option value="ITD201">ITD201 - Advanced Web Design</option>
                <option value="UXD301">UXD301 - User Experience Research</option>
                <option value="ANI301">ANI301 - 3D Animation Techniques</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Assignment Title</label>
              <input
                type="text"
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Design Systems & Component Library Project"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Due Date</label>
                <input
                  type="text"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Maximum Points</label>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1">
                <Send className="w-3.5 h-3.5" />
                <span>Publish to Student Portal</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Grade Modal */}
      {gradingHw && (
        <Modal
          isOpen={!!gradingHw}
          onClose={() => setGradingHw(null)}
          title={`Grade Submission: ${gradingHw.assignmentTitle}`}
          description={`Course: ${gradingHw.courseCode} | Due: ${gradingHw.dueDate}`}
          maxWidth="sm"
        >
          <form onSubmit={handleGrade} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Awarded Score (0 - 100)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={scoreToAssign}
                onChange={(e) => setScoreToAssign(Number(e.target.value))}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-base"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setGradingHw(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Save Grade</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
