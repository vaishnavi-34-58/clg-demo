import React from 'react';
import { Users, BookOpen, UserCheck, CalendarCheck, CheckCircle2, ArrowRight, Bell } from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';

export const HodDashboard: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { facultyMembers, courses, attendance, leaves, approveLeaveRequest } = useErp();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* HOD Hero */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-7 text-white shadow-lg border border-indigo-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            HEAD OF DEPARTMENT • SCHOOL OF ART &amp; INTERACTIVE DESIGN
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-2">Departmental Operations &amp; Academic Leadership</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Faculty workload distribution, syllabus adherence, student attendance monitoring and leave approvals.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate('/management/faculty')}
            className="bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold"
          >
            <span>Faculty Roster</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Department Students</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">420</span>
          <span className="text-[10px] text-slate-500 font-semibold block">Across 3 Program Batches</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Assigned Faculty</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600">{facultyMembers.length}</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">All Classes Allotted</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Department Attendance</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">92.4%</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">Zero Shortage Warnings</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Pending Leave Sanctions</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-500">
            {leaves.filter((l) => l.status === 'Pending').length}
          </span>
          <span className="text-[10px] text-amber-600 font-semibold block">Review Required</span>
        </div>
      </div>

      {/* Pending Leave Requests for HOD Approval */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Student Academic &amp; On-Duty Leave Sanctions</h3>
            <p className="text-xs text-slate-400">Approve leaves submitted through the Student Portal</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">Interconnected Student Data</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {leaves.map((lv) => (
            <div key={lv.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900">{lv.id}</span>
                  <span className="font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px]">
                    {lv.leaveType} Leave
                  </span>
                  <span className="text-slate-400">• Student ID: <strong>{lv.studentId}</strong></span>
                </div>
                <p className="text-slate-700 font-medium">{lv.reason}</p>
                <span className="text-[11px] text-slate-400 block font-mono">
                  Duration: {lv.startDate} to {lv.endDate}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                {lv.status === 'Pending' ? (
                  <>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => approveLeaveRequest(lv.id, 'Approved')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] py-1"
                    >
                      Approve Leave
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => approveLeaveRequest(lv.id, 'Rejected')}
                      className="text-rose-600 border-rose-200 hover:bg-rose-50 text-[11px] py-1"
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {lv.status}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
