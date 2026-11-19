import React, { useState } from 'react';
import {
  HeartHandshake,
  Bell,
  CheckCircle2,
  Send,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';
import { GrievanceTicket } from '../../../mock/grievances.mock';
import { APP_ROUTES } from '../../../app/routes';

export const StudentAffairsDashboard: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
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
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-pink-950 rounded-2xl p-6 sm:p-7 text-white shadow-lg border border-rose-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            DEAN SAMANTHA REED • DEAN OF STUDENT WELFARE &amp; CAMPUS ENGAGEMENT
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-2">Student Affairs, Welfare &amp; Grievance Office</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Student body representation, club governance, health counseling, ombudsman grievance resolution, and campus-wide notifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsNoticeModalOpen(true)}
            className="bg-rose-600 hover:bg-rose-500 text-xs font-semibold gap-1.5"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Broadcast Circular</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Registered Clubs &amp; Teams</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">34</span>
          <span className="text-[10px] text-slate-500 font-semibold block">Sports, Arts, Tech &amp; Debate</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Open Grievance Tickets</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-rose-600">
            {grievances.filter((g) => g.status !== 'Resolved').length}
          </span>
          <span className="text-[10px] text-slate-500 font-semibold block">Under Welfare Committee</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Resolved Grievances</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
            {grievances.filter((g) => g.status === 'Resolved').length}
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold block">Average Resolution: 18h</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Student Satisfaction</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-purple-600">96.4%</span>
          <span className="text-[10px] text-purple-600 font-semibold block">Annual Campus Climate Poll</span>
        </div>
      </div>

      {/* Grievance Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Student Ombudsman &amp; Grievance Redressal</h2>
              <p className="text-xs text-slate-500">Resolutions submitted here update the student's ticket in the Student Portal immediately</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(APP_ROUTES.MANAGEMENT_STUDENT_AFFAIRS)}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Ticket &amp; Category</th>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">Filed Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right rounded-r-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {grievances.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">{g.ticketNumber || g.id}</p>
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
                            setResolutionText(`The Student Welfare Board has reviewed your request regarding "${g.subject}". Corrective action has been dispatched.`);
                          }}
                          className="bg-rose-600 hover:bg-rose-700 text-white text-[11px] py-1 px-2.5 h-auto"
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

        {/* Welfare Quick Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-rose-600" />
              <span>Campus Counseling &amp; Health</span>
            </h2>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500">Wellness Line:</span>
                <span className="font-bold text-slate-800">24/7 Helpline Active</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl flex justify-between">
                <span className="text-slate-500">Ombudsman Hours:</span>
                <span className="font-semibold text-slate-800">09:00 - 17:00 Daily</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => setIsNoticeModalOpen(true)}
              className="text-xs font-semibold gap-1.5"
            >
              <Bell className="w-3.5 h-3.5 text-rose-600" />
              <span>Publish Welfare Circular</span>
            </Button>
          </div>

          <div className="bg-rose-50/70 rounded-2xl border border-rose-200/80 p-5 space-y-2">
            <div className="flex items-center gap-2 text-rose-950 font-bold text-xs">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Zero-Tolerance Anti-Ragging Policy</span>
            </div>
            <p className="text-[11px] text-rose-900/80">
              Campus surveillance squads operate 24/7 across hostel common areas and transit gates. All anonymous tip lines are verified within 2 hours.
            </p>
          </div>
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="Enter formal response to student..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setSelectedTicket(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-rose-600 hover:bg-rose-700 text-white gap-1">
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 font-semibold"
                placeholder="e.g. Annual Student Cultural Festival 'Euphoria 2024' Dates Announced"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Category</label>
                <select
                  value={noticeCategory}
                  onChange={(e) => setNoticeCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="Enter details of the circular..."
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsNoticeModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-rose-600 hover:bg-rose-700 text-white gap-1">
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
