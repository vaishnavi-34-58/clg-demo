import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { MOCK_ATTENDANCE_RECORDS } from '../../mock/attendance.mock';

export const AttendanceView: React.FC = () => {

  // Overall attendance calculation
  const totalClasses = MOCK_ATTENDANCE_RECORDS.reduce((acc, curr) => acc + curr.totalLectures, 0);
  const totalAttended = MOCK_ATTENDANCE_RECORDS.reduce((acc, curr) => acc + curr.attendedLectures, 0);
  const overallPercentage = ((totalAttended / totalClasses) * 100).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Attendance Analytics &amp; Monitoring
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time biometric &amp; class register attendance records • Minimum requirement: 75%
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Eligible for Examinations</span>
          </span>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Overall Cumulative</span>
          <span className="text-3xl font-extrabold text-slate-900">{overallPercentage}%</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">Safe Standing (&gt;75%)</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Total Conducted</span>
          <span className="text-3xl font-extrabold text-slate-900">{totalClasses}</span>
          <span className="text-[10px] text-slate-400 block">Lectures &amp; Studio Labs</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Attended Sessions</span>
          <span className="text-3xl font-extrabold text-emerald-600">{totalAttended}</span>
          <span className="text-[10px] text-slate-400 block">Present in Class</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Missed / Absent</span>
          <span className="text-3xl font-extrabold text-rose-500">{totalClasses - totalAttended}</span>
          <span className="text-[10px] text-slate-400 block">Excused &amp; Unexcused</span>
        </div>
      </div>

      {/* Subject-Wise Breakdown Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Subject-Wise Attendance Summary</h3>
            <p className="text-xs text-slate-500">Track subject ratios to prevent end-term debarment</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">Semester 3</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4">Course</th>
                <th className="p-4">Conducted</th>
                <th className="p-4">Attended</th>
                <th className="p-4">Absent</th>
                <th className="p-4 w-48">Percentage</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ATTENDANCE_RECORDS.map((rec) => {
                const isShortage = rec.percentage < 75;

                return (
                  <tr key={rec.courseId} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4">
                      <span className="font-bold text-slate-900 block">{rec.courseName}</span>
                      <span className="font-mono text-slate-400 text-[11px]">{rec.courseCode}</span>
                    </td>
                    <td className="p-4 font-mono font-medium text-slate-700">{rec.totalLectures}</td>
                    <td className="p-4 font-mono font-medium text-emerald-600">{rec.attendedLectures}</td>
                    <td className="p-4 font-mono font-medium text-rose-500">{rec.totalLectures - rec.attendedLectures}</td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className={rec.percentage >= 85 ? 'text-emerald-700' : 'text-amber-700'}>
                            {rec.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-2 rounded-full ${
                              rec.percentage >= 85 ? 'bg-emerald-500' : rec.percentage >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${rec.percentage}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          !isShortage
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {!isShortage ? 'Eligible' : 'Attendance Shortage'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* University Policy Notice */}
      <div className="p-4 rounded-xl bg-slate-100/70 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
        <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p>
          <span className="font-bold text-slate-800">Academic Regulations Notice:</span> A minimum of 75% attendance in each course is required to be eligible for end-semester examinations. Medical certificates for excused leaves must be submitted within 3 days of returning to campus via the <span className="font-semibold text-slate-900">Leave Management</span> module.
        </p>
      </div>
    </div>
  );
};
