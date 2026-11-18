import React from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Badge, BadgeVariant } from '../ui/Badge';
import { HomeworkItem } from '../../types/assignment';

interface RightSidebarProps {
  homeworks?: HomeworkItem[];
  onViewAllHomeworks?: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  homeworks = [],
  onViewAllHomeworks,
}) => {
  // Mini calendar mockup days
  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const calendarDays = [
    { day: 1, active: false },
    { day: 2, active: false },
    { day: 3, active: false },
    { day: 4, active: false },
    { day: 5, active: false },
    { day: 6, active: false },
    { day: 7, active: false },
    { day: 8, active: false },
    { day: 9, active: false },
    { day: 10, active: false },
    { day: 11, active: false },
    { day: 12, active: true }, // Current selected day (Jan 12)
    { day: 13, active: false },
    { day: 14, active: false },
    { day: 15, active: false },
    { day: 16, active: false },
    { day: 17, active: false },
    { day: 18, active: false },
    { day: 19, active: false },
    { day: 20, active: false },
    { day: 21, active: false },
    { day: 22, active: false },
    { day: 23, active: false },
    { day: 24, active: false },
    { day: 25, active: false },
    { day: 26, active: false },
    { day: 27, active: false },
    { day: 28, active: false },
    { day: 29, active: false },
    { day: 30, active: false },
    { day: 31, active: false },
  ];

  const getStatusBadgeVariant = (status: HomeworkItem['status']): BadgeVariant => {
    switch (status) {
      case 'Completed':
        return 'completed';
      case 'In Progress':
        return 'inProgress';
      case 'Not Submitted':
        return 'notSubmitted';
      case 'Not Started':
        return 'notStarted';
      default:
        return 'default';
    }
  };

  return (
    <aside className="w-80 bg-white border-l border-slate-100 p-6 flex flex-col gap-6 overflow-y-auto shrink-0 select-none">
      {/* Mini Calendar Widget */}
      <div className="bg-slate-50/60 rounded-xl p-4 border border-slate-100">
        <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-800">
          <button className="p-1 hover:bg-white rounded-md transition-colors text-slate-500">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <span>January 2024</span>
          <button className="p-1 hover:bg-white rounded-md transition-colors text-slate-500">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 text-center text-[10px] font-medium text-slate-400 mb-2">
          {weekDays.map((d, i) => (
            <div key={i}>{d}</div>
          ))}
        </div>

        {/* Calendar days grid */}
        <div className="grid grid-cols-7 text-center text-xs gap-y-1">
          {calendarDays.map((item, idx) => (
            <div
              key={idx}
              className={`h-7 w-7 mx-auto flex items-center justify-center rounded-full text-xs font-medium cursor-pointer transition-colors ${
                item.active
                  ? 'bg-slate-900 text-white font-bold'
                  : 'text-slate-600 hover:bg-slate-200/60'
              }`}
            >
              {item.day}
            </div>
          ))}
        </div>
      </div>

      {/* Homeworks Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">Homeworks</h3>
          </div>
          <button
            onClick={onViewAllHomeworks}
            className="text-xs font-medium text-sky-600 hover:text-sky-700 transition-colors"
          >
            View all &gt;
          </button>
        </div>

        {/* Homework list cards */}
        <div className="space-y-3">
          {homeworks.map((hw) => (
            <div
              key={hw.id}
              className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:shadow-xs transition-shadow flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-800 truncate">
                  {hw.courseTitle}
                </span>
                <Badge variant={getStatusBadgeVariant(hw.status)}>
                  {hw.status}
                </Badge>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">
                Assignment: {hw.assignmentTitle}
              </p>
              <span className="text-[10px] text-slate-400">
                Due Date: {hw.dueDate}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
