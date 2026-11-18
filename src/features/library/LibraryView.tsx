import React, { useState } from 'react';
import { Search, BookOpen, RotateCw } from 'lucide-react';
import { MOCK_LIBRARY_BOOKS } from '../../mock/library.mock';
import { LibraryBook } from '../../types/library';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const LibraryView: React.FC = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState<LibraryBook[]>(MOCK_LIBRARY_BOOKS);
  const [searchQuery, setSearchQuery] = useState('');

  const catalog = [
    { id: 'cat_01', title: 'Designing Interfaces: Patterns for Interaction Design', author: 'Jenifer Tidwell', category: 'UI/UX', available: 4, isbn: '978-0134852744' },
    { id: 'cat_02', title: 'The Design of Everyday Things', author: 'Don Norman', category: 'Design', available: 2, isbn: '978-0262037709' },
    { id: 'cat_03', title: 'Refactoring UI: Practical Design Strategies', author: 'Adam Wathan & Steve Schoger', category: 'Web', available: 5, isbn: '978-0578453002' },
    { id: 'cat_04', title: 'The Animator\'s Survival Kit', author: 'Richard Williams', category: 'Animation', available: 3, isbn: '978-0571238347' },
    { id: 'cat_05', title: 'Don\'t Make Me Think: A Common Sense Approach to Web Usability', author: 'Steve Krug', category: 'UI/UX', available: 6, isbn: '978-0321965516' },
  ];

  const handleRenewBook = (bookId: string) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, dueDate: 'Feb 15, 2024' } : b))
    );
    toast('Book loan period renewed for an additional 21 days!', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Digital Campus Library &amp; Book Reserves
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Search physical &amp; digital reserves, renew issued books and track library dues
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:outline-none"
          />
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Active Issued Books</span>
          <span className="text-3xl font-extrabold text-slate-900">
            {books.filter((b) => b.status === 'Issued').length}
          </span>
          <span className="text-[10px] text-slate-400 block">Borrowing Limit: 6 Books</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Next Return Due</span>
          <span className="text-3xl font-extrabold text-indigo-600">Jan 25</span>
          <span className="text-[10px] text-slate-400 block">13 Days Remaining</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Overdue Fines</span>
          <span className="text-3xl font-extrabold text-emerald-600">$0.00</span>
          <span className="text-[10px] text-emerald-600 font-semibold block">Clean Record • No Fines</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-medium text-slate-400 block">Total Books Borrowed</span>
          <span className="text-3xl font-extrabold text-slate-900">14</span>
          <span className="text-[10px] text-slate-400 block">Since Semester 1</span>
        </div>
      </div>

      {/* Active Borrowed Books Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Currently Issued Books</h3>
          <span className="text-xs text-slate-400">Library Pass: UTP-2023-4182</span>
        </div>

        <div className="divide-y divide-slate-100">
          {books.map((book) => (
            <div key={book.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">{book.title}</h4>
                  <p className="text-slate-500 font-medium">Author: {book.author}</p>
                  <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                    <span>Issued: {book.issueDate}</span>
                    <span>•</span>
                    <span className="text-indigo-600 font-semibold">Return Due: {book.dueDate}</span>
                    <span>•</span>
                    <span className="font-mono">ISBN: {book.isbn}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {book.status === 'Issued' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRenewBook(book.id)}
                    className="gap-1.5"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Renew Loan</span>
                  </Button>
                ) : (
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-600 font-semibold text-[11px]">
                    Returned
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Book Catalog Reserve Search */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">Campus Central Library Catalog</h3>
          <span className="text-xs text-slate-400">Showing top academic reserves</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {catalog.map((cat) => (
            <div key={cat.id} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">
                  {cat.category}
                </span>
                <h4 className="font-bold text-slate-900 line-clamp-1">{cat.title}</h4>
                <p className="text-slate-500 text-[11px]">{cat.author}</p>
                <span className="text-[10px] text-emerald-600 font-semibold block">{cat.available} copies available on shelf</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast(`Hold placed for "${cat.title}". Collect at Central Library Desk.`, 'success')}
                className="shrink-0"
              >
                Reserve Book
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
