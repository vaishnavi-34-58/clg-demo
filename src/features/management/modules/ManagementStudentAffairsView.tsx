import React, { useState } from 'react';
import {
  HeartHandshake,
  MessageSquare,
  Bell,
  CheckCircle2,
  Users,
  Send,
  ShieldAlert,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';
import { GrievanceTicket } from '../../../mock/grievances.mock';

export const ManagementStudentAffairsView: React.FC = () => {
  const { grievances, resolveGrievance, postAnnouncement } = useErp();
  const { toast } = useToast();

  const [selectedTicket, setSelectedTicket] = useState<GrievanceTicket | null>(null);
  const [resolutionText, setResolutionText] = useState('');

  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'Academic' | 'Administrative' | 'Campus Life' | 'Examination' | 'General'>('Campus Life');
  const [noticeSummary, setNoticeSummary] = useState('');
  const [noticePriority, setNoticePriority] = useState<'High' | 'Normal' | 'Low'>('High');

  const handleResolveGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTicket) {
      resolveGrievance(selectedTicket.id, resolutionText);
      setSelectedTicket(null);
      setResolutionText('');
      toast(`Grievance #${selectedTicket.ticketNumber || selectedTicket.id} resolved! Student Portal notified with official response.`, 'success');
    }
  };

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    postAnnouncement({
      title: noticeTitle,
      category: noticeCategory,
      summary: noticeSummary,
      priority: noticePriority,
    });
    setIsNoticeModalOpen(false);
    setNoticeTitle('');
    setNoticeSummary('');
    toast(`Announcement "${noticeTitle}" broadcast to all students!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <HeartHandshake className="w-4 h-4" />
              <span>Student Affairs &amp; Ombudsman</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Student Welfare, Grievance Redressal &amp; Notices</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Review and resolve student grievances, publish administrative notices, and supervise campus student societies.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsNoticeModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold gap-1.5"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Broadcast Notice</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Grievances Redressal Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Student Grievance Redressal Register</h2>
            <p className="text-xs text-slate-500">Resolving tickets here immediately notifies the student in their Grievances view</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold">
              <tr>
                <th className="py-2.5 px-3 rounded-l-lg">Ticket &amp; Category</th>
                <th className="py-2.5 px-3">Subject &amp; Details</th>
                <th className="py-2.5 px-3">Filed Date</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {grievances.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-900 font-mono">{g.ticketNumber || g.id}</p>
                    <p className="text-[11px] text-slate-500">{g.category}</p>
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-medium text-slate-800">{g.subject}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{g.description}</p>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{g.filedDate || g.submittedDate}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        g.status === 'Resolved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : g.status === 'In Progress' || g.status === 'In Review'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {g.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {g.status !== 'Resolved' ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedTicket(g);
                          setResolutionText(`The Student Welfare Board has reviewed your grievance regarding "${g.subject}". Corrective action has been dispatched.`);
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] py-1 px-2.5 h-auto"
                      >
                        Resolve
                      </Button>
                    ) : (
                      <span className="text-[11px] text-emerald-600 font-semibold">Resolved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resolve Grievance Modal */}
      {selectedTicket && (
        <Modal
          isOpen={!!selectedTicket}
          onClose={() => setSelectedTicket(null)}
          title={`Resolve Grievance #${selectedTicket.ticketNumber || selectedTicket.id}`}
          description={`Filed by student on ${selectedTicket.filedDate || selectedTicket.submittedDate}. Submit official redressal response.`}
          maxWidth="md"
        >
          <form onSubmit={handleResolveGrievance} className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl space-y-1">
              <p className="font-bold text-slate-900">{selectedTicket.subject}</p>
              <p className="text-slate-600">{selectedTicket.description}</p>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Official Resolution &amp; Remarks</label>
              <textarea
                rows={4}
                value={resolutionText}
                onChange={(e) => setResolutionText(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter formal response to student..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedTicket(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Mark Resolved &amp; Notify Student</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Broadcast Notice Modal */}
      {isNoticeModalOpen && (
        <Modal
          isOpen={isNoticeModalOpen}
          onClose={() => setIsNoticeModalOpen(false)}
          title="Broadcast Campus Circular"
          description="Send an official announcement to all enrolled students. Appears instantly on their Announcements page."
          maxWidth="md"
        >
          <form onSubmit={handlePostNotice} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Circular Title</label>
              <input
                type="text"
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
                placeholder="e.g. Annual Student Cultural Festival 'Euphoria 2024' Dates Announced"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Category</label>
                <select
                  value={noticeCategory}
                  onChange={(e) => setNoticeCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Campus Life">Campus Life</option>
                  <option value="Academic">Academic</option>
                  <option value="Administrative">Administrative</option>
                  <option value="Examination">Examination</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Priority</label>
                <select
                  value={noticePriority}
                  onChange={(e) => setNoticePriority(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="High">High (Banner Notification)</option>
                  <option value="Normal">Normal</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Notice Summary &amp; Details</label>
              <textarea
                rows={3}
                value={noticeSummary}
                onChange={(e) => setNoticeSummary(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter details of the circular..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsNoticeModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1">
                <Send className="w-3.5 h-3.5" />
                <span>Publish Circular</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
