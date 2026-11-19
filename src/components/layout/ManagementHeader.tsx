import React, { useState } from 'react';
import {
  Search,
  Bell,
  Menu,
  GraduationCap,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { UserProfile } from '../../types/auth';
import { Avatar } from '../ui/Avatar';

interface ManagementHeaderProps {
  currentUser: UserProfile;
  currentPath: string;
  onMenuToggle: () => void;
  onSwitchToStudentPortal: () => void;
  onLogout: () => void;
}

export const ManagementHeader: React.FC<ManagementHeaderProps> = ({
  currentUser,
  currentPath,
  onMenuToggle,
  onSwitchToStudentPortal,
  onLogout,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Friendly title for breadcrumb
  const pathParts = currentPath.split('/').filter(Boolean);
  const pageTitle = pathParts[1]
    ? pathParts[1].charAt(0).toUpperCase() + pathParts[1].slice(1).replace('-', ' ')
    : 'Dashboard';

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between gap-4 shrink-0 z-30 select-none">
      {/* Left: Mobile hamburger & breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg lg:hidden cursor-pointer"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs">
          <span className="font-semibold text-slate-400">Management</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
          <span className="font-bold text-slate-900">{pageTitle}</span>
        </div>
      </div>

      {/* Center: Search input */}
      <div className="relative w-48 sm:w-64 lg:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search students, faculty, records..."
          className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
        />
      </div>

      {/* Right: Portal Switcher, notifications, user profile */}
      <div className="flex items-center gap-3">
        {/* Switch to Student Portal shortcut */}
        <button
          onClick={onSwitchToStudentPortal}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 text-xs font-semibold border border-sky-200/80 transition-colors cursor-pointer"
        >
          <GraduationCap className="w-4 h-4 text-sky-600" />
          <span>Student Portal</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors relative cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2.5 z-50">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">System Activity Alerts</span>
                <span className="text-[10px] text-slate-400">Live Sync</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-56 overflow-y-auto text-xs">
                <div className="p-3 hover:bg-slate-50">
                  <p className="font-semibold text-slate-800 text-[11px]">Attendance Synced</p>
                  <p className="text-[10px] text-slate-500">Student Portal updated with latest session ratio.</p>
                </div>
                <div className="p-3 hover:bg-slate-50">
                  <p className="font-semibold text-slate-800 text-[11px]">Fee Payment Cleared</p>
                  <p className="text-[10px] text-slate-500">Bursar confirmed semester tuition payment.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User profile dropdown */}
        <div className="relative pl-2 border-l border-slate-200">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            <Avatar
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              fallback={currentUser.name.charAt(0)}
              size="sm"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 truncate max-w-[120px]">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-indigo-600 font-mono font-semibold">
                {currentUser.role.replace('_', ' ')}
              </span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 text-xs">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="font-bold text-slate-900 truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                <span className="mt-1 inline-block text-[9px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold">
                  {currentUser.role}
                </span>
              </div>
              <button
                onClick={onSwitchToStudentPortal}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-slate-700 cursor-pointer text-left"
              >
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                <span>Switch to Student Portal</span>
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-rose-50 text-rose-600 cursor-pointer text-left"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-500" />
                <span>Sign Out Role</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
