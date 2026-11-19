import React, { useState } from 'react';
import {
  Building2,
  Plus,
  BookOpen,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';
import { Department } from '../../../types/management';

export const ManagementDepartmentsView: React.FC = () => {
  const { departments } = useErp();
  const { toast } = useToast();

  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <Building2 className="w-4 h-4" />
              <span>Institutional Organization</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Academic Departments &amp; Schools</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Faculty distribution, undergraduate enrollment quotas, department heads, and academic budget allocations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => toast('Department restructuring requires Board of Trustees approval.', 'info')}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Department</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {dept.code}
                </span>
                <span className="text-xs font-semibold text-slate-400">Est. 2014</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mt-2">{dept.name}</h3>
              <p className="text-xs text-indigo-600 font-medium mt-0.5">HOD: {dept.hodName}</p>

              {/* Programs */}
              <div className="mt-4 space-y-1">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Offered Programs</span>
                <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                  {(dept.programsOffered || dept.programs || []).map((p, idx) => (
                    <li key={idx} className="truncate">{p}</li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-medium">Faculty</span>
                  <span className="text-sm font-bold text-slate-900">{dept.facultyCount}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-medium">Students</span>
                  <span className="text-sm font-bold text-slate-900">{dept.studentCount}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-medium">Annual Budget</span>
                  <span className="text-sm font-bold text-emerald-700">{dept.budget}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDept(dept)}
                className="text-xs font-semibold"
              >
                View Department Overview
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Department Overview Modal */}
      {selectedDept && (
        <Modal
          isOpen={!!selectedDept}
          onClose={() => setSelectedDept(null)}
          title={selectedDept.name}
          description={`Head of Department: ${selectedDept.hodName} | Department Code: ${selectedDept.code}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Student Enrollment:</span>
                <span className="font-bold text-slate-800">{selectedDept.studentCount} Matriculated Students</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Full-Time Faculty:</span>
                <span className="font-bold text-slate-800">{selectedDept.facultyCount} Professors &amp; Lecturers</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Student-to-Faculty Ratio:</span>
                <span className="font-bold text-indigo-600">
                  {Math.round(selectedDept.studentCount / selectedDept.facultyCount)}:1
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-800">Degree Curricula</span>
              {(selectedDept.programsOffered || selectedDept.programs || []).map((prog, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    {prog}
                  </span>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded">
                    4-Year Track
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedDept(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
