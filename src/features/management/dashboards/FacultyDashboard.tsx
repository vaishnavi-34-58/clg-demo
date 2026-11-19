import React, { useState } from 'react';
import {
  BookOpen,
  CalendarCheck,
  FileSpreadsheet,
  Users,
  Clock,
  MapPin,
  CheckCircle2,
  Plus,
  Send,
  ArrowRight,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';

export const FacultyDashboard: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const {
    studentsList,
    courses,
    homeworks,
    markAttendance,
    createAssignment,
  } = useErp();
  const { toast } = useToast();

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('ART101');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [dueDate, setDueDate] = useState('Feb 25, 2024');
  const [points, setPoints] = useState(100);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    createAssignment({
      courseCode: selectedCourse,
      courseTitle: selectedCourse === 'ART101' ? 'Graphic Fundamentals' : 'Visual Communication Design',
      assignmentTitle,
      dueDate,
      points,
    });
    setIsAssignModalOpen(false);
    setAssignmentTitle('');
    toast(`Assignment "${assignmentTitle}" created and published to Student Portal!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Faculty Hero */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-7 text-white shadow-lg border border-sky-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
            PROF. ARTHUR SMITH • INTERACTIVE MEDIA &amp; GRAPHICS
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-2">Faculty Academic Studio &amp; Classroom</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Live attendance marking, coursework assignments, student critique records and continuous internal evaluations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAssignModalOpen(true)}
            className="bg-sky-600 hover:bg-sky-500 text-xs font-semibold gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Publish New Assignment</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Assigned Courses</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">2</span>
          <span className="text-[10px] text-slate-500 font-semibold block">ART101 &amp; ART202</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Enrolled Students</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600">64</span>
          <span className="text-[10px] text-slate-500 font-semibold block">Studio Lab Batches</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Active Courseworks</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{homeworks.length}</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">Live on Student Portal</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Course Average Attendance</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">94.0%</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">Design Studio A</span>
        </div>
      </div>

      {/* Interactive Quick Attendance Marking Widget */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">ART101</span>
              <h3 className="text-sm font-bold text-slate-900">Live Studio Attendance Register (Today&apos;s Lecture)</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Clicking &quot;Present&quot; or &quot;Absent&quot; immediately updates the student&apos;s real-time attendance in the Student Portal.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Design Studio A • Active Session
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {studentsList.map((stu) => (
            <div key={stu.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <img
                  src={stu.avatarUrl}
                  alt={stu.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{stu.name}</h4>
                  <p className="text-slate-400 font-mono text-[11px]">{stu.studentId} • {stu.program}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    markAttendance('ART101', stu.studentId, 'Present');
                    toast(`Marked Present for ${stu.name}. Student portal updated.`, 'success');
                  }}
                  className="hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 text-xs py-1"
                >
                  Mark Present
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    markAttendance('ART101', stu.studentId, 'Absent');
                    toast(`Marked Absent for ${stu.name}.`, 'warning');
                  }}
                  className="hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-xs py-1"
                >
                  Mark Absent
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Assignments List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Active Coursework &amp; Student Submissions</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('/management/assignments')}
            className="text-xs"
          >
            Manage All
          </Button>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {homeworks.slice(0, 4).map((hw) => (
            <div key={hw.id} className="p-4 flex items-center justify-between">
              <div>
                <span className="font-mono font-bold text-indigo-600 mr-2">[{hw.courseCode}]</span>
                <span className="font-bold text-slate-900">{hw.assignmentTitle}</span>
                <span className="text-slate-400 text-[11px] block mt-0.5">Due Date: {hw.dueDate} • Worth: {hw.points} pts</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${hw.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                {hw.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Create Assignment Modal */}
      {isAssignModalOpen && (
        <Modal
          isOpen={isAssignModalOpen}
          onClose={() => setIsAssignModalOpen(false)}
          title="Create &amp; Publish New Assignment"
          description="Publishes immediately to enrolled students on their Student Portal dashboard"
          maxWidth="md"
        >
          <form onSubmit={handleCreateAssignment} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Target Course</label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
              >
                <option value="ART101">ART101 - Graphic Fundamentals</option>
                <option value="ART202">ART202 - Visual Communication Design</option>
                <option value="ITD201">ITD201 - Advanced Web Design</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Assignment Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Design Studio Project 2: Heuristic Audit"
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Due Date</label>
                <input
                  type="text"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Total Points</label>
                <input
                  type="number"
                  required
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAssignModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish to Students</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
