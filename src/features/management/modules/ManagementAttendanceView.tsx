import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { useToast } from '../../../hooks/useToast';

export const ManagementAttendanceView: React.FC = () => {
  const { attendance, courses, markAttendance, student } = useErp();
  const { toast } = useToast();

  const [selectedCourseCode, setSelectedCourseCode] = useState(courses[0]?.courseCode || 'ART101');
  const selectedSessionDate = 'Today (Live Class)';

  const currentCourseAttendance = attendance.find((a) => a.courseCode === selectedCourseCode);

  const handleMark = (status: 'Present' | 'Absent') => {
    markAttendance(selectedCourseCode, student.studentId, status);
    toast(
      `Marked ${status} for ${student.name} in ${selectedCourseCode}! Student Portal attendance updated.`,
      status === 'Present' ? 'success' : 'info'
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <CalendarCheck className="w-4 h-4" />
              <span>Biometric &amp; Classroom Attendance</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Attendance Register &amp; Live Roll Call</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Take daily lecture roll calls, audit minimum 75% examination eligibility thresholds, and update student records.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedCourseCode}
              onChange={(e) => setSelectedCourseCode(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.courseCode}>
                  {c.courseCode} - {c.courseName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Total Lectures Conducted</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {currentCourseAttendance?.totalLectures || 24}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold block">Academic Term 2023-24</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Lectures Attended</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
            {currentCourseAttendance?.attendedLectures || 22}
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold block">By Merna Vance</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Attendance Percentage</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600">
            {currentCourseAttendance?.percentage || 92}%
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold block">
            {currentCourseAttendance?.status === 'Good' ? 'Eligible for Finals' : 'Critical - Warning Sent'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Audit Status</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">Synchronized</span>
          <span className="text-[10px] text-slate-500 font-semibold block">Live with Student Portal</span>
        </div>
      </div>

      {/* Live Roll Call Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Interactive Roll Call: {selectedCourseCode}
            </h2>
            <p className="text-xs text-slate-500">
              Clicking Present or Absent updates the student's attendance stats in the Student Portal in real-time.
            </p>
          </div>

          <span className="text-xs font-mono font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
            Session: {selectedSessionDate}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold">
              <tr>
                <th className="py-2.5 px-3 rounded-l-lg">Student Name &amp; ID</th>
                <th className="py-2.5 px-3">Enrolled Course</th>
                <th className="py-2.5 px-3">Cumulative Attended</th>
                <th className="py-2.5 px-3">Current Ratio</th>
                <th className="py-2.5 px-3">Threshold Status</th>
                <th className="py-2.5 px-3 text-right rounded-r-lg">Live Roll Call</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/60">
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2.5">
                    <img src={student.avatarUrl} alt={student.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-slate-900">{student.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{student.studentId}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <p className="font-medium text-slate-800">{selectedCourseCode}</p>
                  <p className="text-[11px] text-slate-500">Design Studio</p>
                </td>
                <td className="py-3 px-3 font-semibold text-slate-800">
                  {currentCourseAttendance?.attendedLectures || 22} / {currentCourseAttendance?.totalLectures || 24}
                </td>
                <td className="py-3 px-3 font-bold text-indigo-600">
                  {currentCourseAttendance?.percentage || 92}%
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      (currentCourseAttendance?.percentage || 92) >= 75
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {(currentCourseAttendance?.percentage || 92) >= 75 ? 'Good (&ge;75%)' : 'Critical (&lt;75%)'}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleMark('Present')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] py-1 px-2.5 h-auto gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Present</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleMark('Absent')}
                      className="border-rose-200 text-rose-700 hover:bg-rose-50 text-[11px] py-1 px-2.5 h-auto gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Absent</span>
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* All Courses Attendance Overview */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-900">Semester Course Attendance Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {attendance.map((att) => (
            <div key={att.courseCode} className="p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-indigo-700">{att.courseCode}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    att.percentage >= 75
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {att.percentage}%
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 truncate">{att.courseName}</p>
              <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                <span>Attended:</span>
                <span className="font-semibold text-slate-800">{att.attendedLectures} of {att.totalLectures}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
