import React from 'react';
import { BookOpen, CheckSquare, Award, Clock } from 'lucide-react';

interface QuickStatsProps {
  onNavigate?: (path: string) => void;
}

export const QuickStats: React.FC<QuickStatsProps> = ({ onNavigate }) => {
  const stats = [
    {
      label: 'Enrolled Courses',
      value: '4',
      subtext: 'Spring 2024 (14 Credits)',
      icon: BookOpen,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-100',
      path: '/enrolled-courses',
    },
    {
      label: 'Overall Attendance',
      value: '92.2%',
      subtext: 'Above 75% Requirement',
      icon: CheckSquare,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      path: '/attendance',
    },
    {
      label: 'Cumulative CGPA',
      value: '3.84',
      subtext: 'Dean\'s Honors List',
      icon: Award,
      color: 'text-amber-600 bg-amber-50 border-amber-100',
      path: '/grade-report',
    },
    {
      label: 'Pending Deadlines',
      value: '2',
      subtext: 'Next: Feb 10, 2024',
      icon: Clock,
      color: 'text-rose-600 bg-rose-50 border-rose-100',
      path: '/homeworks',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;

        return (
          <div
            key={i}
            onClick={() => onNavigate?.(stat.path)}
            className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between"
          >
            <div>
              <span className="text-[11px] font-medium text-slate-400 block mb-1">
                {stat.label}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight block">
                {stat.value}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {stat.subtext}
              </span>
            </div>
            <div className={`p-2.5 rounded-xl border ${stat.color} shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
