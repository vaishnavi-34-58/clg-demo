import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Eye,
  Award,
  UserPlus,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';
import { StudentProfile } from '../../../types/student';

export const ManagementStudentsView: React.FC = () => {
  const { studentsList, updateStudentProfile } = useErp();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAdvisor, setEditingAdvisor] = useState('');

  const filteredStudents = studentsList.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.studentId.toLowerCase().includes(q) ||
      s.program.toLowerCase().includes(q) ||
      s.department.toLowerCase().includes(q)
    );
  });

  const handleSaveAdvisor = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudent) {
      const updated = { ...selectedStudent, advisorName: editingAdvisor };
      updateStudentProfile(updated);
      setSelectedStudent(updated);
      setIsEditModalOpen(false);
      toast(`Advisor updated to ${editingAdvisor} for ${selectedStudent.name}.`, 'success');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <Users className="w-4 h-4" />
              <span>Academic Affairs Directory</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Student Registry &amp; Academic Profiles</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage enrolled undergraduate and postgraduate students, track cumulative GPAs, and inspect student records.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => toast('New student registration flow is managed via Admissions Approvals.', 'info')}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Enroll New Student</span>
            </Button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by student name, roll number, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-500 font-medium">Showing {filteredStudents.length} of {studentsList.length} students</span>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Student Name &amp; ID</th>
                <th className="py-3 px-4">Degree &amp; Department</th>
                <th className="py-3 px-4">Semester</th>
                <th className="py-3 px-4">Cumulative GPA</th>
                <th className="py-3 px-4">Faculty Advisor</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.avatarUrl}
                        alt={s.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
                      />
                      <div>
                        <p className="font-bold text-slate-900">{s.name}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{s.studentId} • {s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-slate-800">{s.program}</p>
                    <p className="text-[11px] text-slate-500">{s.department}</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      Semester {s.currentSemester} of {s.totalSemesters}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-bold text-slate-900">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      <span>{s.cgpa.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">{s.advisorName || 'Prof. Arthur Smith'}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedStudent(s)}
                      className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Dossier</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Dossier Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Academic Dossier: ${selectedStudent.name}`}
          description={`ID: ${selectedStudent.studentId} | Academic Year: ${selectedStudent.academicYear}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            {/* Header Card */}
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <img
                src={selectedStudent.avatarUrl}
                alt={selectedStudent.name}
                className="w-16 h-16 rounded-xl object-cover ring-2 ring-indigo-500/20 shadow-xs"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-slate-900">{selectedStudent.name}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Active Matriculated
                  </span>
                </div>
                <p className="text-slate-600 font-medium">{selectedStudent.program}</p>
                <p className="text-[11px] text-slate-400 font-mono">{selectedStudent.email}</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                <span className="text-[10px] text-indigo-600 font-semibold block">Cumulative GPA</span>
                <span className="text-xl font-bold text-indigo-950">{selectedStudent.cgpa.toFixed(2)}</span>
                <span className="text-[10px] text-indigo-700">Top 5% of cohort</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-400 font-semibold block">Current Semester</span>
                <span className="text-xl font-bold text-slate-900">Term {selectedStudent.currentSemester}</span>
                <span className="text-[10px] text-slate-500">of {selectedStudent.totalSemesters} Semesters</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                <span className="text-[10px] text-slate-400 font-semibold block">Faculty Advisor</span>
                <span className="text-sm font-bold text-slate-900 truncate block mt-1">{selectedStudent.advisorName || 'Prof. Arthur Smith'}</span>
                <button
                  onClick={() => {
                    setEditingAdvisor(selectedStudent.advisorName || 'Prof. Arthur Smith');
                    setIsEditModalOpen(true);
                  }}
                  className="text-[10px] text-indigo-600 hover:underline font-semibold"
                >
                  Change Advisor
                </button>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-amber-900 text-[11px] leading-relaxed">
              <strong>Synchronized Profile:</strong> This profile is shared with the Student Portal. Any adjustments made here reflect live when Merna Vance signs into her portal.
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedStudent(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Advisor Modal */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Reassign Faculty Advisor"
          description={`Update faculty mentor for ${selectedStudent?.name}`}
          maxWidth="sm"
        >
          <form onSubmit={handleSaveAdvisor} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Select Faculty Mentor</label>
              <select
                value={editingAdvisor}
                onChange={(e) => setEditingAdvisor(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Prof. Arthur Smith">Prof. Arthur Smith (Interactive Design)</option>
                <option value="Dr. Gregory Clark">Dr. Gregory Clark (Computer Science)</option>
                <option value="Dr. Elena Ward">Dr. Elena Ward (Information Systems)</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Save &amp; Update
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
