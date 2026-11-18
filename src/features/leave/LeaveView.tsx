import React, { useState } from 'react';
import { Send, Plus } from 'lucide-react';
import { LeaveRequest, LeaveType } from '../../types/leave';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';

export const LeaveView: React.FC = () => {
  const { toast } = useToast();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const initialLeaves: LeaveRequest[] = [
    {
      id: 'LV-2023-014',
      studentId: 'UTP-2023-4182',
      leaveType: 'Medical',
      startDate: 'Nov 12, 2023',
      endDate: 'Nov 14, 2023',
      reason: 'Viral fever and prescribed medical rest by health center physician.',
      status: 'Approved',
      appliedOn: 'Nov 11, 2023',
      reviewedBy: 'Dean of Student Welfare',
    },
    {
      id: 'LV-2023-022',
      studentId: 'UTP-2023-4182',
      leaveType: 'Academic',
      startDate: 'Dec 04, 2023',
      endDate: 'Dec 05, 2023',
      reason: 'Attended Inter-University Design Hackathon & Design Jury as representative.',
      status: 'Approved',
      appliedOn: 'Dec 01, 2023',
      reviewedBy: 'Faculty Mentor - Dr. Johnson',
    },
  ];

  const [leaves, setLeaves] = useState<LeaveRequest[]>(initialLeaves);

  // Form State
  const [leaveType, setLeaveType] = useState<LeaveType>('Personal');
  const [startDate, setStartDate] = useState('2024-02-01');
  const [endDate, setEndDate] = useState('2024-02-03');
  const [reason, setReason] = useState('');
  const [fileName, setFileName] = useState('');

  const handleApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    const newLeave: LeaveRequest = {
      id: `LV-2024-${Math.floor(100 + Math.random() * 900)}`,
      studentId: 'UTP-2023-4182',
      leaveType,
      startDate,
      endDate,
      reason,
      status: 'Pending',
      appliedOn: 'Today',
      reviewedBy: 'Academic Advisor (Pending Review)',
    };

    setLeaves([newLeave, ...leaves]);
    setIsApplyModalOpen(false);
    setReason('');
    setFileName('');
    toast('Leave application submitted for approval!', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Student Leave Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Submit formal leave requests, track medical approvals and maintain attendance exemption records
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsApplyModalOpen(true)}
          className="gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Apply for Leave</span>
        </Button>
      </div>

      {/* Leave Balances / Quotas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Casual / Personal Quota</span>
          <span className="text-3xl font-extrabold text-slate-900">8 / 10</span>
          <span className="text-[10px] text-slate-400 block">Days Remaining This Academic Year</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Medical Leave Quota</span>
          <span className="text-3xl font-extrabold text-emerald-600">12 / 15</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">Requires Doctor Certificate</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Duty / Academic Exemption</span>
          <span className="text-3xl font-extrabold text-indigo-600">5 / 5</span>
          <span className="text-[10px] text-slate-400 block">Conferences &amp; Sports Representation</span>
        </div>
      </div>

      {/* Leave Applications History */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Leave Application History</h3>
          <span className="text-xs text-slate-400">{leaves.length} Applications on Record</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4">Reference ID</th>
                <th className="p-4">Type</th>
                <th className="p-4">From</th>
                <th className="p-4">To</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Status</th>
                <th className="p-4">Reviewed By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leaves.map((lv) => (
                <tr key={lv.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-900">{lv.id}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded font-medium bg-slate-100 text-slate-800">
                      {lv.leaveType}
                    </span>
                  </td>
                  <td className="p-4">{lv.startDate}</td>
                  <td className="p-4">{lv.endDate}</td>
                  <td className="p-4 max-w-xs truncate text-slate-700" title={lv.reason}>
                    {lv.reason}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        lv.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : lv.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {lv.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">{lv.reviewedBy || 'Academic Office'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {isApplyModalOpen && (
        <Modal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          title="Apply for Student Leave"
          description="Submit formal notification to your faculty mentor and dean"
          maxWidth="md"
        >
          <form onSubmit={handleApplyLeave} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Leave Category</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value as LeaveType)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:ring-2 focus:ring-slate-900 focus:outline-none"
              >
                <option value="Personal">Personal / Casual Leave</option>
                <option value="Medical">Medical Leave (Doctor Certificate)</option>
                <option value="Academic">Academic On-Duty / Competition</option>
                <option value="Duty">Campus Event Duty</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">End Date</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Detailed Reason for Absence</label>
              <textarea
                rows={3}
                required
                placeholder="State valid reason for leave..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Supporting Document (Optional for Medical)</label>
              <div className="border border-dashed border-slate-300 rounded-lg p-3 text-center bg-slate-50 cursor-pointer relative">
                <input
                  type="file"
                  onChange={(e) => e.target.files && setFileName(e.target.files[0].name)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <p className="text-slate-600">{fileName || 'Attach medical note or invitation letter'}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsApplyModalOpen(false)}
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
                <span>Submit Application</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
