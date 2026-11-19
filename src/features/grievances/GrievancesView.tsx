import React, { useState } from 'react';
import { Plus, Send, ShieldCheck } from 'lucide-react';
import { GrievanceTicket } from '../../mock/grievances.mock';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import { useErp } from '../../hooks/useErp';

export const GrievancesView: React.FC = () => {
  const { toast } = useToast();
  const { grievances } = useErp();
  const tickets = grievances;
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Form State
  const [category, setCategory] = useState<GrievanceTicket['category']>('Academics');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<GrievanceTicket['priority']>('Medium');

  const handleLodgeGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: GrievanceTicket = {
      id: `GRV-2024-0${Math.floor(20 + Math.random() * 80)}`,
      category,
      subject,
      description,
      submittedDate: 'Today',
      status: 'Open',
      priority,
      response: 'Ticket assigned to Ombudsman officer. Estimated response time: 24-48 hours.',
      respondedBy: 'Student Grievance Cell',
    };

    grievances.unshift(newTicket);
    setIsNewModalOpen(false);
    setSubject('');
    setDescription('');
    toast('Grievance lodged successfully! Reference number sent.', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Student Feedback &amp; Grievance Redressal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Submit confidential feedback, academic appeals, infrastructure issues and monitor administrative resolution
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsNewModalOpen(true)}
          className="gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Lodge Grievance / Feedback</span>
        </Button>
      </div>

      {/* SLA & Cell Information Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Total Tickets Lodged</span>
          <span className="text-3xl font-extrabold text-slate-900">{tickets.length}</span>
          <span className="text-[10px] text-slate-400 block">Active Academic Term</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Successfully Resolved</span>
          <span className="text-3xl font-extrabold text-emerald-600">
            {tickets.filter((t) => t.status === 'Resolved').length}
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold block">100% SLA Compliance</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Average Turnaround</span>
          <span className="text-3xl font-extrabold text-indigo-600">24 Hrs</span>
          <span className="text-[10px] text-slate-400 block">Internal Grievance Committee</span>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-900 text-xs">{t.id}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                  {t.category}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${t.priority === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'}`}>
                  Priority: {t.priority}
                </span>
              </div>

              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold self-start sm:self-auto ${
                  t.status === 'Resolved'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                {t.status}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{t.subject}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t.description}</p>
            </div>

            {t.response && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Administrative Response ({t.respondedBy}):</span>
                </div>
                <p className="text-slate-600 pl-5">{t.response}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Grievance Modal */}
      {isNewModalOpen && (
        <Modal
          isOpen={isNewModalOpen}
          onClose={() => setIsNewModalOpen(false)}
          title="Lodge Formal Student Grievance"
          description="Confidential ticket sent directly to the Student Welfare Ombudsman"
          maxWidth="md"
        >
          <form onSubmit={handleLodgeGrievance} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GrievanceTicket['category'])}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                >
                  <option value="Academics">Academics &amp; Grading</option>
                  <option value="Hostel">Hostel &amp; Mess Facilities</option>
                  <option value="IT / Portal">Campus Wi-Fi &amp; IT Services</option>
                  <option value="Library">Library &amp; Book Availability</option>
                  <option value="Finance">Bursar &amp; Fee Ledger</option>
                  <option value="General">General Campus Welfare</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Urgency Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as GrievanceTicket['priority'])}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
                >
                  <option value="Low">Low (General suggestion)</option>
                  <option value="Medium">Medium (Routine maintenance)</option>
                  <option value="High">High (Immediate attention required)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Subject Title</label>
              <input
                type="text"
                required
                placeholder="Brief summary of issue..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Detailed Description</label>
              <textarea
                rows={3}
                required
                placeholder="Elaborate problem with specific room number, course or department..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsNewModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Grievance</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
