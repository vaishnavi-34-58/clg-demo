import React, { useState } from 'react';
import {
  CreditCard,
  TrendingUp,
  CheckCircle2,
  Receipt,
  Download,
  ArrowRight,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';
import { APP_ROUTES } from '../../../app/routes';

export const AccountsDashboard: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { finance, recordFeePayment } = useErp();
  const { toast } = useToast();

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedFeeId, setSelectedFeeId] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(1250);
  const [paymentMode, setPaymentMode] = useState('Wire Transfer / ACH');

  const pendingFees = finance.filter((f) => f.status === 'Pending' || f.status === 'Overdue');

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const feeToPay = finance.find((f) => f.id === selectedFeeId) || pendingFees[0];
    if (feeToPay) {
      recordFeePayment(feeToPay.id, paymentAmount, paymentMode);
      setIsPaymentModalOpen(false);
      toast(`Payment of $${paymentAmount.toLocaleString()} recorded! Student Portal fee status updated to Paid.`, 'success');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-cyan-950 rounded-2xl p-6 sm:p-7 text-white shadow-lg border border-emerald-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            SARAH CONNER, CPA • CHIEF FINANCIAL CONTROLLER
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-2">Bursar &amp; Financial Accounts Management</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Tuition fee billing, scholarship disbursements, lab dues, payment reconciliation, and real-time student ledger updates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              if (pendingFees.length > 0) {
                setSelectedFeeId(pendingFees[0].id);
                setPaymentAmount(pendingFees[0].amount);
              }
              setIsPaymentModalOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Record Student Payment</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Total Billed YTD</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">$4.85M</span>
          <span className="text-[10px] text-slate-500 font-semibold block">Academic Year 2023-24</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Collected Revenue</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">$4.12M</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">85.0% Realization Rate</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Outstanding Invoices</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-600">
            ${pendingFees.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
          </span>
          <span className="text-[10px] text-amber-600 font-semibold block">{pendingFees.length} Pending Invoices</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Scholarships Disbursed</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-cyan-600">$640K</span>
          <span className="text-[10px] text-slate-500 font-semibold block">128 Merit Recipients</span>
        </div>
      </div>

      {/* Financial Ledger & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Student Fee Invoices &amp; Balances</h2>
              <p className="text-xs text-slate-500">Payments recorded here immediately update the student's Finance dashboard</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(APP_ROUTES.MANAGEMENT_FINANCE)}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold gap-1"
            >
              <span>Full Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Student &amp; Invoice</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Amount</th>
                  <th className="py-2.5 px-3">Due Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right rounded-r-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {finance.map((fee) => (
                  <tr key={fee.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">Merna Vance</p>
                      <p className="text-[11px] text-slate-400 font-mono">{fee.invoiceNumber || fee.id}</p>
                    </td>
                    <td className="py-3 px-3">
                      <p className="font-medium text-slate-800">{fee.title}</p>
                      <p className="text-[11px] text-slate-500">{fee.semester || fee.term}</p>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900">${fee.amount.toLocaleString()}</td>
                    <td className="py-3 px-3 text-slate-600">{fee.dueDate}</td>
                    <td className="py-3 px-3">
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
                    <td className="py-3 px-3 text-right">
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
                          Collect
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

        {/* Financial Highlights */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Revenue Channels</span>
            </h2>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-semibold text-slate-800">Tuition &amp; Academic</p>
                  <p className="text-[10px] text-slate-400">Semesters I - VIII</p>
                </div>
                <span className="font-bold text-slate-900">$3,420,000</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-semibold text-slate-800">Hostel &amp; Mess Dues</p>
                  <p className="text-[10px] text-slate-400">Campus Residences</p>
                </div>
                <span className="font-bold text-slate-900">$480,000</span>
              </div>
              <div className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-semibold text-slate-800">Transit Pass Fees</p>
                  <p className="text-[10px] text-slate-400">Fleet Operations</p>
                </div>
                <span className="font-bold text-slate-900">$220,000</span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => toast('Exporting Q1 Reconciliation Ledger (.XLSX)...', 'info')}
              className="text-xs font-semibold gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Download Fiscal Report</span>
            </Button>
          </div>

          <div className="bg-emerald-50 rounded-2xl border border-emerald-200/80 p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
              <Receipt className="w-4 h-4 text-emerald-600" />
              <span>Gateway Health Status</span>
            </div>
            <p className="text-[11px] text-emerald-900/80">
              Stripe &amp; University ACH gateways are operational with a 99.8% transaction success rate over the last 30 days.
            </p>
          </div>
        </div>
      </div>

      {/* Record Payment Modal */}
      {isPaymentModalOpen && (
        <Modal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          title="Record Fee Payment"
          description="Enter fee collection details for student Merna Vance. The invoice in the Student Portal will instantly reflect as Paid with an official receipt number."
          maxWidth="md"
        >
          <form onSubmit={handleRecordPayment} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Select Fee Item</label>
              <select
                value={selectedFeeId}
                onChange={(e) => {
                  setSelectedFeeId(e.target.value);
                  const selected = finance.find((f) => f.id === e.target.value);
                  if (selected) setPaymentAmount(selected.amount);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {finance.map((fee) => (
                  <option key={fee.id} value={fee.id}>
                    {fee.title} ({fee.invoiceNumber || fee.id}) - ${fee.amount} [{fee.status}]
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Amount to Credit ($)</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Number(e.target.value))}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Payment Mode</label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                <span>Record &amp; Sync to Student Portal</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
