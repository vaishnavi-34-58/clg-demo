import React from 'react';
import { Award, Users, BookOpen, CheckCircle2, TrendingUp, Building, ArrowRight } from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';

export const PrincipalDashboard: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { departments, facultyMembers, attendance } = useErp();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Principal Hero */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-2xl p-6 sm:p-7 text-white shadow-lg border border-purple-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
            OFFICE OF THE PRINCIPAL &amp; DEAN
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-2">Institutional Academic Governance</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Overall collegiate oversight, NAAC accreditation benchmarks, faculty performance metrics and institutional KPIs.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onNavigate('/management/departments')}
          className="bg-purple-600 hover:bg-purple-500 text-xs font-semibold self-start md:self-auto"
        >
          <span>Audit Departments</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Graduation Pass Rate</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">96.4%</span>
          <span className="text-[10px] text-emerald-600 font-semibold block flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +1.2% over previous year
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Campus Attendance Avg</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">91.8%</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">Safe Standing Threshold</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Faculty-to-Student Ratio</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-indigo-600">1 : 18</span>
          <span className="text-[10px] text-slate-500 font-semibold block">National Standard Compliant</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Total Revenue Invoiced</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">$1.84M</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">92% Collected</span>
        </div>
      </div>

      {/* Departmental Performance Overview Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Academic Departmental Performance &amp; Strength</h3>
          <span className="text-xs text-slate-400">Spring 2024 Session</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4">Department Name</th>
                <th className="p-4">Department Head</th>
                <th className="p-4 text-center">Faculty Count</th>
                <th className="p-4 text-center">Students</th>
                <th className="p-4 text-center">Avg Attendance</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {departments.map((dept, i) => (
                <tr key={dept.id} className="hover:bg-slate-50/70">
                  <td className="p-4 font-bold text-slate-900">{dept.name}</td>
                  <td className="p-4 font-semibold text-indigo-700">{dept.hodName}</td>
                  <td className="p-4 text-center font-mono">{dept.facultyCount}</td>
                  <td className="p-4 text-center font-mono font-bold text-slate-900">{dept.studentCount}</td>
                  <td className="p-4 text-center">
                    <span className="px-2 py-0.5 rounded font-bold bg-emerald-50 text-emerald-700">
                      {92 - i * 1.5}%
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate('/management/departments')}
                      className="text-[11px] py-1"
                    >
                      Audit
                    </Button>
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
