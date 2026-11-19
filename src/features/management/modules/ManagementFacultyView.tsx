import React, { useState } from 'react';
import {
  UserCheck,
  Search,
  Mail,
  MapPin,
  Send,
  Plus,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';
import { FacultyMember } from '../../../types/management';

export const ManagementFacultyView: React.FC = () => {
  const { facultyMembers } = useErp();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState('');

  const filteredFaculty = facultyMembers.filter((f) => {
    const q = searchQuery.toLowerCase();
    return (
      f.name.toLowerCase().includes(q) ||
      f.department.toLowerCase().includes(q) ||
      f.designation.toLowerCase().includes(q)
    );
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFaculty) {
      toast(`Internal memo dispatched to ${selectedFaculty.name} (${selectedFaculty.email}).`, 'success');
      setIsMessageModalOpen(false);
      setMessageText('');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <UserCheck className="w-4 h-4" />
              <span>Academic Personnel</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Faculty &amp; Teaching Staff Directory</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Professors, associate lecturers, research fellows, course assignments, and departmental offices.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => toast('Faculty onboarding portal is synchronized with HR System.', 'info')}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Faculty Member</span>
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-5 flex items-center gap-3 pt-4 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search faculty by name, department, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Grid of Faculty Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFaculty.map((f) => (
          <div
            key={f.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start gap-3.5">
                <img
                  src={f.avatarUrl}
                  alt={f.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{f.name}</h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        f.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {f.status}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-600 font-medium">{f.designation}</p>
                  <p className="text-[11px] text-slate-400 truncate">{f.department}</p>
                </div>
              </div>

              {/* Course assignments */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold block uppercase">Assigned Courses</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {f.assignedCourses.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-mono font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 text-[11px] text-slate-600 pt-1">
                  <p className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{f.email}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Office {f.officeRoom}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedFaculty(f);
                  setIsMessageModalOpen(true);
                }}
                className="text-xs font-semibold gap-1"
              >
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <span>Send Memo</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Message Modal */}
      {isMessageModalOpen && selectedFaculty && (
        <Modal
          isOpen={isMessageModalOpen}
          onClose={() => setIsMessageModalOpen(false)}
          title={`Official Memo to ${selectedFaculty.name}`}
          description={`Direct communication to ${selectedFaculty.email}`}
          maxWidth="md"
        >
          <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Memo Content</label>
              <textarea
                rows={4}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Type official communication..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsMessageModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1">
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch Memo</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
