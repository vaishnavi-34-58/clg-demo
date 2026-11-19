import React, { useState } from 'react';
import {
  CreditCard,
  Search,
  Filter,
  CheckCircle2,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';

export const ManagementFinanceView: React.FC = () => {
  const { finance, recordFeePayment } = useErp();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedFeeId, setSelectedFeeId] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(1250);
  const [paymentMode, setPaymentMode] = useState('Wire Transfer / ACH');

  const filteredFinance = finance.filter((fee) => {
    const matchesSearch =
      fee.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (fee.invoiceNumber || fee.id).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || fee.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const targetFee = finance.find((f) => f.id === selectedFeeId) || finance[0];
    if (targetFee) {
      recordFeePayment(targetFee.id, paymentAmount, paymentMode);
      setIsPaymentModalOpen(false);
      toast(`Payment of $${paymentAmount.toLocaleString()} recorded! Student Portal status updated to Paid.`, 'success');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <CreditCard className="w-4 h-4" />
              <span>Bursar &amp; Student Accounts</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Fee Management &amp; Accounts Ledger</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Tuition schedules, lab assessments, hostel mess fees, payment recording, and automated receipt generation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                if (finance.length > 0) {
                  setSelectedFeeId(finance[0].id);
                  setPaymentAmount(finance[0].amount);
                }
                setIsPaymentModalOpen(true);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Record Fee Payment</span>
            </Button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search invoice number, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 font-medium"
            >
              <option value="ALL">All Invoice Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Invoice # &amp; Student</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Semester</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Payment Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFinance.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900 font-mono">{fee.invoiceNumber || fee.id}</p>
                    <p className="text-[11px] text-slate-400">Merna Vance (UTP-2023-4182)</p>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-slate-800">{fee.title}</p>
                    <p className="text-[11px] text-slate-500">Official Campus Invoice</p>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-600">{fee.semester || fee.term}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">${fee.amount.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-slate-600">{fee.dueDate}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        fee.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : fee.status === 'Overdue'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {fee.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {fee.status !== 'Paid' ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedFeeId(fee.id);
                          setPaymentAmount(fee.amount);
                          setIsPaymentModalOpen(true);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] py-1 px-2.5 h-auto"
                      >
                        Record Payment
                      </Button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-mono">{fee.receiptNumber}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {isPaymentModalOpen && (
        <Modal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          title="Record Fee Payment &amp; Issue Receipt"
          description="Enter transaction details for student Merna Vance. The invoice status in the Student Portal updates immediately."
          maxWidth="md"
        >
          <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Select Fee Invoice</label>
              <select
                value={selectedFeeId}
                onChange={(e) => {
                  setSelectedFeeId(e.target.value);
                  const selected = finance.find((f) => f.id === e.target.value);
                  if (selected) setPaymentAmount(selected.amount);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              >
                {finance.map((fee) => (
                  <option key={fee.id} value={fee.id}>
                    {fee.title} ({fee.invoiceNumber || fee.id}) - ${fee.amount} [{fee.status}]
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Payment Amount ($)</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Transaction Channel</label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Wire Transfer / ACH">Wire Transfer / ACH</option>
                <option value="Credit / Debit Card">Credit / Debit Card</option>
                <option value="Cash / Campus Cashier Desk">Cash / Campus Cashier Desk</option>
                <option value="Demand Draft / Check">Demand Draft / Check</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsPaymentModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confirm Payment &amp; Sync</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
