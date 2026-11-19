import React, { useState } from 'react';
import {
  Library,
  BookmarkPlus,
  RotateCcw,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { useErp } from '../../../hooks/useErp';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { useToast } from '../../../hooks/useToast';

export const ManagementLibraryView: React.FC = () => {
  const { library, issueLibraryBook, returnLibraryBook } = useErp();
  const { toast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');

  const filteredBooks = library.filter((b) => {
    const q = searchQuery.toLowerCase();
    return (
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.isbn.toLowerCase().includes(q)
    );
  });

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
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-semibold text-xs tracking-wider uppercase">
              <Library className="w-4 h-4" />
              <span>Library &amp; Learning Commons</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 mt-1">Circulation Desk &amp; Catalog Management</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Issue books to matriculated students, manage loans and due dates, track check-ins, and maintain catalog inventory.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsIssueModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold gap-1.5"
            >
              <BookmarkPlus className="w-3.5 h-3.5" />
              <span>Issue Book to Student</span>
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="mt-5 flex items-center gap-3 pt-4 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search library catalog by title, author, or ISBN barcode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Circulation Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">Title &amp; Author</th>
                <th className="py-3 px-4">ISBN / Barcode</th>
                <th className="py-3 px-4">Borrower Student</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Circulation Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBooks.map((bk) => (
                <tr key={bk.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{bk.title}</p>
                    <p className="text-[11px] text-slate-500">{bk.author}</p>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{bk.isbn}</td>
                  <td className="py-3.5 px-4 font-medium text-slate-800">Merna Vance (UTP-2023-4182)</td>
                  <td className="py-3.5 px-4 text-slate-600">{bk.issueDate || 'Recent'}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{bk.dueDate || '14 Days'}</td>
                  <td className="py-3.5 px-4">
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
                  <td className="py-3.5 px-4 text-right">
                    {bk.status === 'Issued' ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReturnBook(bk.id, bk.title)}
                        className="text-xs text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 py-1 px-2.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        <span>Check In / Return</span>
                      </Button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-semibold">Returned</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                placeholder="e.g. 978-1119547600"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsIssueModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Issue &amp; Sync to Student Portal</span>
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
