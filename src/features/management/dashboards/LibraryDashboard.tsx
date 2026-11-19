import React, { useState } from 'react';
import {
  BookOpen,
  BookmarkPlus,
  RotateCcw,
  CheckCircle2,
  Search,
  ArrowRight,
  Barcode,
  Library,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';
import { APP_ROUTES } from '../../../app/routes';

export const LibraryDashboard: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { library, issueLibraryBook, returnLibraryBook } = useErp();
  const { toast } = useToast();

  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleIssueBook = (e: React.FormEvent) => {
    e.preventDefault();
    issueLibraryBook(bookTitle, author, isbn);
    setIsIssueModalOpen(false);
    setBookTitle('');
    setAuthor('');
    setIsbn('');
    toast(`Book "${bookTitle}" issued to student Merna Vance! Updated on Student Portal.`, 'success');
  };

  const handleReturnBook = (id: string, title: string) => {
    returnLibraryBook(id);
    toast(`Book "${title}" checked in and marked Available!`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-2xl p-6 sm:p-7 text-white shadow-lg border border-emerald-900/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            DR. ELEANOR VANCE, MLIS • CHIEF UNIVERSITY LIBRARIAN
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mt-2">Library &amp; Knowledge Resource Center</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Central catalog management, RFID checkout turnstiles, digital repository subscriptions, inter-library loan processing, and overdue clearance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsIssueModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold gap-1.5"
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
            <span>Issue Book to Student</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Total Volumes</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">48,200</span>
          <span className="text-[10px] text-slate-500 font-semibold block">Print &amp; Reference Catalog</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Active Borrowings</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600">3,840</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">Under Active Loan</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Student Loans</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-teal-600">{library.length}</span>
          <span className="text-[10px] text-slate-500 font-semibold block">Issued to Merna Vance</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400">Digital Subscriptions</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">142</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">IEEE, JSTOR, ACM Live</span>
        </div>
      </div>

      {/* Circulation Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Circulation Desk - Active Loans</h2>
              <p className="text-xs text-slate-500">Books checked out to students; syncing live with the Student Portal Library tab</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(APP_ROUTES.MANAGEMENT_LIBRARY)}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold gap-1"
            >
              <span>Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-lg">Book Title &amp; Author</th>
                  <th className="py-2.5 px-3">ISBN / Barcode</th>
                  <th className="py-2.5 px-3">Issued On</th>
                  <th className="py-2.5 px-3">Due Date</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right rounded-r-lg">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {library.map((bk) => (
                  <tr key={bk.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">{bk.title}</p>
                      <p className="text-[11px] text-slate-500">{bk.author}</p>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-500">{bk.isbn}</td>
                    <td className="py-3 px-3 text-slate-600">{bk.issueDate || 'Recent'}</td>
                    <td className="py-3 px-3 font-medium text-slate-800">{bk.dueDate || '14 Days'}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          bk.status === 'Issued'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {bk.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      {bk.status === 'Issued' ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReturnBook(bk.id, bk.title)}
                          className="text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 p-1.5"
                          title="Check in Book"
                        >
                          <RotateCcw className="w-3.5 h-3.5 mr-1" />
                          <span>Return</span>
                        </Button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-semibold">Archived</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Barcode className="w-4 h-4 text-emerald-600" />
              <span>RFID Scanner Integration</span>
            </h2>
            <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
              <span className="text-slate-500 block">Kiosk Hardware ID:</span>
              <span className="font-mono font-bold text-slate-800">RFID-SCANNER-DESK-01</span>
              <p className="text-[11px] text-slate-400">
                Connected to turnstiles. Books placed in the smart tray auto-populate checkout requests.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              fullWidth
              onClick={() => {
                setBookTitle('Designing Data-Intensive Applications');
                setAuthor('Martin Kleppmann');
                setIsbn('978-1449373320');
                setIsIssueModalOpen(true);
              }}
              className="text-xs font-semibold gap-1.5"
            >
              <Search className="w-3.5 h-3.5 text-emerald-600" />
              <span>Quick Scan Sample Book</span>
            </Button>
          </div>

          <div className="bg-emerald-50/70 rounded-2xl border border-emerald-200/80 p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-950 font-bold text-xs">
              <Library className="w-4 h-4 text-emerald-600" />
              <span>Inter-Library Exchange Active</span>
            </div>
            <p className="text-[11px] text-emerald-900/80">
              CampusOne University is connected to 18 partner university libraries with zero-cost cross-delivery of requested academic monographs.
            </p>
          </div>
        </div>
      </div>

      {/* Issue Book Modal */}
      {isIssueModalOpen && (
        <Modal
          isOpen={isIssueModalOpen}
          onClose={() => setIsIssueModalOpen(false)}
          title="Issue Book to Student"
          description="Loan a book to Merna Vance (UTP-2023-4182). This immediately adds the title to her Student Portal library loans."
          maxWidth="md"
        >
          <form onSubmit={handleIssueBook} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-medium mb-1">Book Title</label>
              <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                placeholder="e.g. Interaction Design: Beyond Human-Computer Interaction"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">Author(s)</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Helen Sharp, Yvonne Rogers"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-medium mb-1">ISBN / Barcode</label>
              <input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                placeholder="e.g. 978-1119547600"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsIssueModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Issue &amp; Sync to Portal</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
