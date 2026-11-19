import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  RotateCcw,
  Save,
  Building,
  Key,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { useToast } from '../../../hooks/useToast';

export const ManagementSettingsView: React.FC = () => {
  const { currentUser } = useErp();
  const { toast } = useToast();

  const [institutionName, setInstitutionName] = useState('CampusOne Institute of Higher Education & Technology');
  const [academicYear, setAcademicYear] = useState('2023 - 2024');
  const [currentTerm, setCurrentTerm] = useState('Winter Semester III');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast('Institution settings updated successfully.', 'success');
  };

  const handleResetDemoState = () => {
    if (window.confirm('Reset all demo state to factory defaults? This clears locally saved attendance, assignments, and payments.')) {
      localStorage.removeItem('utopia_erp_unified_state_v1');
      localStorage.removeItem('utopia_mgmt_user');
      localStorage.removeItem('utopia_erp_student');
      localStorage.removeItem('utopia_erp_homeworks');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <Settings className="w-4 h-4" />
              <span>ERP Administration</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">System &amp; Institution Settings</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Academic term calendars, authentication parameters, security access levels, and demo data controls.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetDemoState}
              className="text-xs font-semibold text-rose-600 border-rose-200 hover:bg-rose-50 gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo State</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-4 h-4 text-indigo-600" />
            <span>Institutional Configuration</span>
          </h2>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">University Legal Title</label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Active Academic Year</label>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Active Semester Term</label>
                <input
                  type="text"
                  value={currentTerm}
                  onChange={(e) => setCurrentTerm(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <Button variant="primary" size="sm" type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5">
                <Save className="w-3.5 h-3.5" />
                <span>Save Institution Parameters</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Security Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Key className="w-4 h-4 text-indigo-600" />
              <span>Authentication Profile</span>
            </h2>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Active Operator:</span>
                <span className="font-bold text-slate-900">{currentUser?.name || 'Super Admin'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Assigned Role:</span>
                <span className="font-mono font-bold text-indigo-700">{currentUser?.role || 'SUPER_ADMIN'}</span>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-500">Portal Security:</span>
                <span className="font-semibold text-emerald-600">RBAC Enforced</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50/70 rounded-2xl border border-indigo-200/80 p-5 space-y-2">
            <div className="flex items-center gap-2 text-indigo-950 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Zero-Trust Role Permissions</span>
            </div>
            <p className="text-[11px] text-indigo-900/80">
              Only authenticated roles with granted navigational permissions are permitted to execute domain mutations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
