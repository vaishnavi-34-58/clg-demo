import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  Download,
  Clock,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { useToast } from '../../../hooks/useToast';

export const ManagementAuditLogsView: React.FC = () => {
  const { auditLogs } = useErp();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterModule, setFilterModule] = useState('ALL');

  const filteredLogs = auditLogs.filter((l) => {
    const matchesSearch =
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModule = filterModule === 'ALL' || l.module === filterModule;
    return matchesSearch && matchesModule;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <ShieldAlert className="w-4 h-4" />
              <span>Compliance &amp; System Traceability</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Enterprise Audit Trail &amp; Access Logs</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Immutable logging of all role-based mutations, grade moderation events, financial collections, and cross-portal updates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast('Exporting complete audit trail (.CSV)...', 'info')}
              className="text-xs font-semibold gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit Trail (.CSV)</span>
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search audit trail by actor, action, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterModule}
              onChange={(e) => setFilterModule(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 font-medium"
            >
              <option value="ALL">All System Modules</option>
              <option value="Authentication">Authentication</option>
              <option value="Academics">Academics</option>
              <option value="Examinations">Examinations</option>
              <option value="Accounts & Finance">Accounts &amp; Finance</option>
              <option value="Hostel Management">Hostel Management</option>
              <option value="Transport Management">Transport Management</option>
              <option value="Library Management">Library Management</option>
              <option value="Admissions">Admissions</option>
              <option value="Student Affairs">Student Affairs</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Log ID &amp; Time</th>
                <th className="py-3 px-4">Actor &amp; Role</th>
                <th className="py-3 px-4">Module</th>
                <th className="py-3 px-4">Action Summary</th>
                <th className="py-3 px-4">Event Details</th>
                <th className="py-3 px-4 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900 font-mono">{log.id}</p>
                    <p className="text-[11px] text-slate-400">{log.timestamp}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-800">{log.userName}</p>
                    <span className="inline-block mt-0.5 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {log.role}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-indigo-700">{log.module}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{log.action}</td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs">{log.details}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        log.status === 'SUCCESS'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
