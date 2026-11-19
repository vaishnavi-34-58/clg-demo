import React from 'react';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Building2,
  BookOpen,
  CalendarCheck,
  FileSpreadsheet,
  Award,
  CreditCard,
  Building,
  Bus,
  Library,
  Briefcase,
  AlertCircle,
  ShieldAlert,
  Settings,
  LogOut,
  GraduationCap,
  X,
  UserPlus,
} from 'lucide-react';
import { ManagementRole } from '../../types/auth';
import { ROLE_NAV_PERMISSIONS } from '../../constants/managementRoles';
import { cn } from '../../utils/cn';

interface ManagementSidebarProps {
  role: ManagementRole;
  userName: string;
  department?: string;
  currentPath: string;
  onNavigate: (path: string) => void;
  onSwitchToStudentPortal: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

interface NavItemConfig {
  id: string;
  label: string;
  path: string;
  icon: React.ElementType;
}

const ALL_MANAGEMENT_NAV_ITEMS: NavItemConfig[] = [
  { id: 'dashboard', label: 'Role Dashboard', path: '/management/dashboard', icon: LayoutDashboard },
  { id: 'students', label: 'Student Management', path: '/management/students', icon: Users },
  { id: 'dept-students', label: 'Department Students', path: '/management/students', icon: Users },
  { id: 'faculty', label: 'Faculty Management', path: '/management/faculty', icon: UserCheck },
  { id: 'dept-faculty', label: 'Department Faculty', path: '/management/faculty', icon: UserCheck },
  { id: 'departments', label: 'Departments', path: '/management/departments', icon: Building2 },
  { id: 'courses', label: 'Courses & Curriculum', path: '/management/courses', icon: BookOpen },
  { id: 'attendance', label: 'Attendance Central', path: '/management/attendance', icon: CalendarCheck },
  { id: 'attendance-marking', label: 'Mark Attendance', path: '/management/attendance', icon: CalendarCheck },
  { id: 'attendance-monitoring', label: 'Attendance Audit', path: '/management/attendance', icon: CalendarCheck },
  { id: 'my-classes', label: 'My Assigned Classes', path: '/management/courses', icon: BookOpen },
  { id: 'assignments', label: 'Assignments Central', path: '/management/assignments', icon: FileSpreadsheet },
  { id: 'assignments-review', label: 'Assignments Review', path: '/management/assignments', icon: FileSpreadsheet },
  { id: 'marks-entry', label: 'Internal Marks Entry', path: '/management/examinations', icon: Award },
  { id: 'examinations', label: 'Exam Operations', path: '/management/examinations', icon: Award },
  { id: 'exam-schedules', label: 'Exam Schedules & Hall', path: '/management/examinations', icon: Award },
  { id: 'hall-allocation', label: 'Hall Allocation', path: '/management/examinations', icon: Award },
  { id: 'marks-moderation', label: 'Marks Moderation', path: '/management/examinations', icon: Award },
  { id: 'result-publication', label: 'Result Publication', path: '/management/examinations', icon: Award },
  { id: 'admissions', label: 'Admission Enquiries', path: '/management/admissions', icon: UserPlus },
  { id: 'enquiries', label: 'Applicant Inquiries', path: '/management/admissions', icon: UserPlus },
  { id: 'applications', label: 'Applications Review', path: '/management/admissions', icon: UserPlus },
  { id: 'document-verification', label: 'Document Verification', path: '/management/admissions', icon: UserPlus },
  { id: 'approvals', label: 'Admission Approvals', path: '/management/admissions', icon: UserPlus },
  { id: 'course-allocation', label: 'Course Allocation', path: '/management/admissions', icon: UserPlus },
  { id: 'finance', label: 'Accounts & Bursar', path: '/management/finance', icon: CreditCard },
  { id: 'fee-structures', label: 'Fee Structures', path: '/management/finance', icon: CreditCard },
  { id: 'fee-collection', label: 'Fee Collection', path: '/management/finance', icon: CreditCard },
  { id: 'pending-dues', label: 'Pending Dues Ledger', path: '/management/finance', icon: CreditCard },
  { id: 'hostel', label: 'Hostel Housing', path: '/management/hostel', icon: Building },
  { id: 'hostel-overview', label: 'Hostel Overview', path: '/management/hostel', icon: Building },
  { id: 'rooms-allocation', label: 'Room & Bed Allocations', path: '/management/hostel', icon: Building },
  { id: 'maintenance-tickets', label: 'Room Repairs & AC', path: '/management/hostel', icon: Building },
  { id: 'transport', label: 'Fleet & Transit', path: '/management/transport', icon: Bus },
  { id: 'transport-overview', label: 'Transport Overview', path: '/management/transport', icon: Bus },
  { id: 'fleet-management', label: 'Fleet & Buses', path: '/management/transport', icon: Bus },
  { id: 'routes-stops', label: 'Routes & Stops', path: '/management/transport', icon: Bus },
  { id: 'library', label: 'Library Central', path: '/management/library', icon: Library },
  { id: 'book-inventory', label: 'Book Inventory', path: '/management/library', icon: Library },
  { id: 'issue-return', label: 'Issue & Returns', path: '/management/library', icon: Library },
  { id: 'placements', label: 'Career & Placements', path: '/management/placements', icon: Briefcase },
  { id: 'recruitment-drives', label: 'Recruitment Drives', path: '/management/placements', icon: Briefcase },
  { id: 'student-affairs', label: 'Student Affairs', path: '/management/student-affairs', icon: AlertCircle },
  { id: 'grievances', label: 'Grievances Redressal', path: '/management/student-affairs', icon: AlertCircle },
  { id: 'campus-clubs', label: 'Clubs & Activities', path: '/management/student-affairs', icon: AlertCircle },
  { id: 'audit-logs', label: 'System Audit Logs', path: '/management/audit-logs', icon: ShieldAlert },
  { id: 'settings', label: 'ERP Settings', path: '/management/settings', icon: Settings },
];

export const ManagementSidebar: React.FC<ManagementSidebarProps> = ({
  role,
  userName,
  department,
  currentPath,
  onNavigate,
  onSwitchToStudentPortal,
  isOpen = false,
  onClose,
}) => {
  // Get allowed IDs for this role
  const allowedIds = ROLE_NAV_PERMISSIONS[role] || ['dashboard'];

  // Filter nav items, deduplicating paths so we don't display identical links
  const seenPaths = new Set<string>();
  const filteredNavItems = ALL_MANAGEMENT_NAV_ITEMS.filter((item) => {
    if (!allowedIds.includes(item.id)) return false;
    if (seenPaths.has(item.path)) return false;
    seenPaths.add(item.path);
    return true;
  });

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={cn(
          'w-64 bg-slate-950 text-slate-300 flex flex-col h-screen shrink-0 border-r border-slate-800/80 select-none transition-transform duration-300 z-50 fixed inset-y-0 left-0 lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200 text-xs font-bold font-mono">
              C1
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-sm block">CampusOne</span>
              <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                Management Portal
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-md lg:hidden cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Authenticated Role Badge */}
        <div className="p-4 border-b border-slate-800/60 bg-slate-900/40">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono uppercase tracking-wider">
              {role.replace('_', ' ')}
            </span>
          </div>
          <h4 className="text-xs font-bold text-white truncate">{userName}</h4>
          <p className="text-[10px] text-slate-400 truncate mt-0.5">{department || 'Central Administration'}</p>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 block">
            Authorized Modules ({filteredNavItems.length})
          </span>

          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.path);
                  onClose?.();
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer',
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                )}
              >
                <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-white' : 'text-slate-400')} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Footer actions: Portal switch & logout */}
        <div className="p-3 border-t border-slate-800/80 space-y-1.5 bg-slate-950/80">
          <button
            onClick={onSwitchToStudentPortal}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 text-sky-400 border border-slate-800 transition-colors cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="truncate">View as Student (Portal)</span>
          </button>

          <button
            onClick={() => onNavigate('/management/logout')}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-rose-400 hover:bg-slate-900 rounded-xl transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-slate-400 hover:text-rose-400 shrink-0" />
            <span>Sign Out Role</span>
          </button>
        </div>
      </aside>
    </>
  );
};
