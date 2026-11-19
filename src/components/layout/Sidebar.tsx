import React from 'react';
import {
  LayoutDashboard,
  User,
  Calendar,
  FileText,
  BookOpen,
  GraduationCap,
  Layers,
  Map,
  CheckSquare,
  Library,
  CreditCard,
  Bell,
  CalendarOff,
  Sparkles,
  Building2,
  Bus,
  Award,
  AlertCircle,
  Briefcase,
  Settings,
  BellRing,
  LogOut,
  X,
} from 'lucide-react';
import { STUDENT_NAV_SECTIONS } from '../../constants/navigation';
import { cn } from '../../utils/cn';

interface SidebarProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  User,
  Calendar,
  FileText,
  BookOpen,
  GraduationCap,
  Layers,
  Map,
  CheckSquare,
  Library,
  CreditCard,
  Bell,
  CalendarOff,
  Sparkles,
  Building2,
  Bus,
  Award,
  AlertCircle,
  Briefcase,
  Settings,
  BellRing,
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath = '/dashboard',
  onNavigate,
  isOpen = false,
  onClose,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'w-64 bg-slate-900 text-slate-300 flex flex-col h-screen shrink-0 border-r border-slate-800 select-none transition-transform duration-300 z-50 fixed inset-y-0 left-0 lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 text-xs font-bold font-mono">
              C1
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-white text-sm">
                CampusOne
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Student Portal</span>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-md lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5 scrollbar-thin">
          {STUDENT_NAV_SECTIONS.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {section.sectionTitle && (
                <h3 className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                  {section.sectionTitle}
                </h3>
              )}
              {section.items.map((item) => {
                const Icon = iconMap[item.iconName] || LayoutDashboard;
                const isActive = currentPath === item.path;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate?.(item.path);
                      onClose?.();
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left cursor-pointer',
                      isActive
                        ? 'bg-slate-800 text-white font-semibold shadow-xs'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    )}
                  >
                    <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-sky-400' : 'text-slate-400')} />
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Logout Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <button
            onClick={() => {
              onNavigate?.('/logout');
              onClose?.();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-slate-400 hover:text-rose-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
