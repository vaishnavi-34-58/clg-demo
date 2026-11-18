import React, { useState } from 'react';
import { CreditCard, Printer, FileText, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { MOCK_FEE_ITEMS } from '../../mock/finance.mock';
import { FeeItem } from '../../types/finance';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';

export const FinanceView: React.FC = () => {
  const { toast } = useToast();
  const [feeItems, setFeeItems] = useState<FeeItem[]>(MOCK_FEE_ITEMS);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<FeeItem | null>(null);

  // Form state for demo payment
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'scholarship'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');

  const totalPaid = feeItems
    .filter((f) => f.status === 'Paid')
    .reduce((sum, f) => sum + f.amount, 0);

  const totalOutstanding = feeItems
    .filter((f) => f.status === 'Pending' || f.status === 'Overdue')
    .reduce((sum, f) => sum + f.amount, 0);

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = feeItems.map((item) => {
      if (item.status === 'Pending') {
        return {
          ...item,
          status: 'Paid' as const,
          paidDate: 'Jan 12, 2024',
          receiptNumber: `RCPT-2024-${Math.floor(1000 + Math.random() * 9000)}`,
        };
      }
      return item;
    });

    setFeeItems(updated);
    setIsPaymentModalOpen(false);
    toast('Demo Tuition Payment of $4,200 successfully processed!', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Student Finance &amp; Fee Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Tuition ledger, student fee statements, online payments and tax receipts
          </p>
        </div>

        {totalOutstanding > 0 && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsPaymentModalOpen(true)}
            className="gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Pay Dues Online (${totalOutstanding})</span>
          </Button>
        )}
      </div>

      {/* Top Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Total Invoiced (Sem 3 &amp; 4)</span>
          <span className="text-3xl font-extrabold text-slate-900">${totalPaid + totalOutstanding}</span>
          <span className="text-[10px] text-slate-400 block">Academic Year 2023 - 2024</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Total Amount Settled</span>
          <span className="text-3xl font-extrabold text-emerald-600">${totalPaid}</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">Official Receipts Generated</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Pending Balance</span>
          <span className="text-3xl font-extrabold text-amber-500">${totalOutstanding}</span>
          <span className="text-[10px] text-slate-400 block">Due Jan 30, 2024</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Account Standing</span>
          <span className="text-3xl font-extrabold text-slate-900">
            {totalOutstanding === 0 ? 'CLEARED' : 'PENDING'}
          </span>
          <span className="text-[10px] text-slate-400 block">No Financial Holds</span>
        </div>
      </div>

      {/* Fee Breakdown Structure */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Semester 3 Tuition Fee</span>
            <span className="text-xs font-bold font-mono text-slate-800">$4,200</span>
          </div>
          <p className="text-xs text-slate-500">Includes core academic instruction, faculty mentorship and degree credits.</p>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded inline-block">Paid in Full</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Design Studio &amp; Lab Access</span>
            <span className="text-xs font-bold font-mono text-slate-800">$450</span>
          </div>
          <p className="text-xs text-slate-500">High-end computing hardware, Maya 3D rendering licenses and studio equipment.</p>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded inline-block">Paid in Full</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Advance Semester 4 Deposit</span>
            <span className="text-xs font-bold font-mono text-slate-800">$4,200</span>
          </div>
          <p className="text-xs text-slate-500">Upcoming term advance payment window open until Jan 30, 2024.</p>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded inline-block ${totalOutstanding === 0 ? 'text-emerald-600 bg-emerald-50' : 'text-amber-700 bg-amber-50'}`}>
            {totalOutstanding === 0 ? 'Settled Online' : 'Pending Payment'}
          </span>
        </div>
      </div>

      {/* Transactions & Receipts Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Fee Payment History &amp; Official Receipts</h3>
          <span className="text-xs text-slate-400">All amounts shown in USD ($)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4">Description</th>
                <th className="p-4">Academic Term</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Receipt No.</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feeItems.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{fee.title}</td>
                  <td className="p-4 text-slate-600">{fee.term}</td>
                  <td className="p-4 font-mono font-bold text-slate-900">${fee.amount.toLocaleString()}</td>
                  <td className="p-4">{fee.dueDate}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        fee.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {fee.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-slate-500">
                    {fee.receiptNumber || '—'}
                  </td>
                  <td className="p-4 text-center">
                    {fee.status === 'Paid' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedReceipt(fee)}
                        className="text-[11px] py-1 px-2.5 gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Receipt</span>
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setIsPaymentModalOpen(true)}
                        className="text-[11px] py-1 px-2.5"
                      >
                        Pay Now
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Online Payment Modal */}
      {isPaymentModalOpen && (
        <Modal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          title="Student Online Fee Payment (Demo Gateway)"
          description="Secure 256-bit SSL encrypted college payment portal"
          maxWidth="md"
        >
          <form onSubmit={handleExecutePayment} className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-slate-400 block text-[10px]">Paying For</span>
              <p className="font-bold text-slate-900">Semester 4 Tuition Fee (Advance Registration)</p>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Payable Amount:</span>
                <span className="text-lg font-bold font-mono text-slate-900">$4,200.00</span>
              </div>
            </div>

            {/* Payment Mode Selector */}
            <div className="space-y-1.5">
              <label className="font-semibold text-slate-700 block">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-center font-medium cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  Credit / Debit
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`p-2.5 rounded-xl border text-center font-medium cursor-pointer ${
                    paymentMethod === 'bank'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  Net Banking
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('scholarship')}
                  className={`p-2.5 rounded-xl border text-center font-medium cursor-pointer ${
                    paymentMethod === 'scholarship'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  Campus Grant
                </button>
              </div>
            </div>

            {/* Card Inputs */}
            {paymentMethod === 'card' && (
              <div className="space-y-3">
                <div>
                  <label className="text-slate-600 block mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-600 block mb-1">Expiry Date</label>
                    <input
                      type="text"
                      defaultValue="08/27"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1">CVV / CVC</label>
                    <input
                      type="password"
                      defaultValue="889"
                      maxLength={4}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-800 text-[11px] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Simulated demo transaction. No real financial charge will occur.</span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsPaymentModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="gap-1.5"
              >
                <span>Confirm &amp; Pay $4,200</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Official Receipt Modal */}
      {selectedReceipt && (
        <Modal
          isOpen={!!selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
          title="Official Fee Payment Receipt"
          description={`Receipt Number: ${selectedReceipt.receiptNumber}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 uppercase">UTOPIA UNIVERSITY BURSAR &amp; ACCOUNTS</h4>
                  <p className="text-[10px] text-slate-500">Official Electronic Payment Receipt</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded border border-emerald-200">
                  PAID
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-slate-200 text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[10px]">Student Name</span>
                  <span className="font-bold text-slate-800">Merna Vance</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Student ID</span>
                  <span className="font-mono font-bold text-slate-800">UTP-2023-4182</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Transaction Item</span>
                  <span className="font-semibold text-slate-800">{selectedReceipt.title}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Amount Settled</span>
                  <span className="font-bold font-mono text-emerald-600">${selectedReceipt.amount.toLocaleString()}.00</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Date of Payment</span>
                  <span className="text-slate-800">{selectedReceipt.paidDate || 'Sep 10, 2023'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Mode of Payment</span>
                  <span className="text-slate-800">Online Banking Gateway</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedReceipt(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  toast('Downloading official receipt PDF...', 'success');
                  window.print();
                }}
                className="gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Receipt</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
