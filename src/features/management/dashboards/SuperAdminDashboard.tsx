import React from 'react';
import {
  Users,
  Building2,
  TrendingUp,
  ArrowRight,
  UserCheck,
  ShieldCheck,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';

export const SuperAdminDashboard: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { facultyMembers, departments, auditLogs } = useErp();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-7 text-white shadow-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            SYSTEM ROOT ACCESS • LEVEL 0
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-2">Super Administrator Command Center</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Real-time infrastructure health, user authorization, cross-departmental operations and institution-wide audit trail.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate('/management/audit-logs')}
            className="bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold"
          >
            <span>View Full Audit Logs</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">Total Enrolled Students</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">3,420</span>
          <span className="text-[10px] text-emerald-600 font-semibold block flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +140 Fall Intake
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">Faculty &amp; Staff</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{facultyMembers.length * 45}</span>
          <span className="text-[10px] text-slate-500 font-semibold block">Across 12 Departments</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">Academic Units</span>
            <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{departments.length}</span>
          <span className="text-[10px] text-slate-500 font-semibold block">Fully Accredited</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">System Integrity</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">99.98%</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">All Nodes Healthy</span>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigate('/management/students')}
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-400 transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Student Record Registry</h3>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-xs text-slate-500">Search and audit active student profiles, semesters and transcripts.</p>
        </div>

        <div
          onClick={() => onNavigate('/management/finance')}
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-400 transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Bursar &amp; Revenue Overview</h3>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-xs text-slate-500">Track semester collections, student dues, fee structures and refunds.</p>
        </div>

        <div
          onClick={() => onNavigate('/management/audit-logs')}
          className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-400 transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm">Institutional Security Audit</h3>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-xs text-slate-500">Inspect real-time logs of grade entries, fee clearances and room allocations.</p>
        </div>
      </div>

      {/* Live Recent System Audit Logs */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recent Interconnected Operations</h3>
            <p className="text-xs text-slate-400">Actions synchronized between Management and Student Portal</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('/management/audit-logs')}
            className="text-xs"
          >
            View All Logs
          </Button>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {auditLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900">{log.id}</span>
                  <span className="font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px]">
                    {log.role}
                  </span>
                  <span className="text-slate-400">• {log.userName}</span>
                </div>
                <p className="text-slate-700 font-medium">{log.action}: {log.details}</p>
              </div>
              <span className="text-[11px] text-slate-400 font-mono shrink-0">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
