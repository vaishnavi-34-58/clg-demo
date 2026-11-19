import React, { useState } from 'react';
import { CheckCheck, AlertCircle } from 'lucide-react';
import { Announcement } from '../../types/announcement';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';
import { useErp } from '../../hooks/useErp';

export const AnnouncementsView: React.FC = () => {
  const { toast } = useToast();
  const { announcements } = useErp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedNotice, setSelectedNotice] = useState<Announcement | null>(null);
  const [readIds, setReadIds] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Academic', 'Campus', 'Exam', 'Administrative'];

  const filtered = announcements.filter((a) => {
    if (selectedCategory === 'All') return true;
    return a.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const handleMarkAllRead = () => {
    const allRead: Record<string, boolean> = {};
    announcements.forEach((a) => {
      allRead[a.id] = true;
    });
    setReadIds(allRead);
    toast('All notifications marked as read', 'info');
  };

  const handleNoticeClick = (notice: Announcement) => {
    setSelectedNotice(notice);
    setReadIds((prev) => ({ ...prev, [notice.id]: true }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Announcements &amp; Campus Circulars
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Official institutional notices, exam schedules, departmental updates and circulars
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAllRead}
          className="gap-1.5"
        >
          <CheckCheck className="w-3.5 h-3.5 text-slate-600" />
          <span>Mark All as Read</span>
        </Button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 text-xs font-semibold overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {cat} Notices
          </button>
        ))}
      </div>

      {/* Notice Cards List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => handleNoticeClick(item)}
            className={`bg-white rounded-2xl border p-5 shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              item.isRead || readIds[item.id] ? 'border-slate-200/80 opacity-80' : 'border-indigo-200 ring-1 ring-indigo-100/50'
            }`}
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {item.category}
                </span>
                {item.priority === 'High' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Urgent Notice
                  </span>
                )}
                {!item.isRead && (
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                )}
              </div>

              <h3 className="text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-2">
                {item.summary}
              </p>

              <div className="flex items-center gap-3 text-slate-400 text-[11px] pt-1">
                <span>Issued by: <strong className="text-slate-700">{item.author}</strong></span>
                <span>•</span>
                <span>Date: <strong className="text-slate-700">{item.date}</strong></span>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleNoticeClick(item);
              }}
              className="text-xs self-end sm:self-center shrink-0"
            >
              Read Full Notice
            </Button>
          </div>
        ))}
      </div>

      {/* Notice Modal */}
      {selectedNotice && (
        <Modal
          isOpen={!!selectedNotice}
          onClose={() => setSelectedNotice(null)}
          title={selectedNotice.title}
          description={`Category: ${selectedNotice.category} • Date: ${selectedNotice.date}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-slate-500 text-[11px]">
                <span>Issued by: <strong className="text-slate-800">{selectedNotice.author}</strong></span>
                <span className="font-mono">{selectedNotice.date}</span>
              </div>
              <p className="text-slate-700 text-xs leading-relaxed pt-1">
                {selectedNotice.summary}
              </p>
              <p className="text-slate-600 leading-relaxed">
                For further procedural inquiries or extensions, students are advised to contact the respective departmental academic dean or visit the student facilitation center during campus operating hours (09:00 AM – 04:30 PM).
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedNotice(null)}
              >
                Understood &amp; Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
