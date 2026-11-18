import React, { useState } from 'react';
import { Search, Bell, MessageSquare, Menu, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { Avatar } from '../ui/Avatar';
import { ProgressBar } from '../ui/ProgressBar';
import { StudentProfile } from '../../types/student';

interface HeaderProps {
  student: StudentProfile;
  dateString?: string;
  onSearch?: (query: string) => void;
  onNavigate?: (path: string) => void;
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  student,
  dateString = '12 Jan 2024, Friday',
  onSearch,
  onNavigate,
  onMenuToggle,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'Spring 2024 Course Registration', time: '10m ago', unread: true },
    { id: 2, title: 'Design Project 1 due in 2 days', time: '1h ago', unread: true },
    { id: 3, title: 'Exam Hall Ticket Published', time: 'Yesterday', unread: false },
  ];

  return (
    <header className="h-20 bg-white border-b border-slate-100 px-4 sm:px-8 flex items-center justify-between gap-4 shrink-0 relative z-30">
      {/* Mobile Menu Toggle & Search Bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg lg:hidden cursor-pointer"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-48 sm:w-72 lg:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses, exams, books..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-lg text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Center Welcome & Date */}
      <div className="hidden xl:flex flex-col items-start">
        <h1 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
          <span>👋</span>
          <span>Welcome, {student.preferredName}!</span>
        </h1>
        <span className="text-xs text-slate-400">{dateString}</span>
      </div>

      {/* Right Actions & Profile */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Semester Progress */}
        <div className="hidden md:flex flex-col w-32 lg:w-40">
          <ProgressBar
            current={student.currentSemester}
            total={student.totalSemesters}
            label={`Semester ${student.currentSemester} of ${student.totalSemesters}`}
          />
        </div>

        {/* Quick Icon Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => onNavigate?.('/announcements')}
            title="Messages & Notices"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              title="Notifications"
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors relative cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Notifications</span>
                  <button
                    onClick={() => onNavigate?.('/announcements')}
                    className="text-[11px] text-sky-600 hover:underline cursor-pointer"
                  >
                    View all
                  </button>
                </div>
                <div className="divide-y divide-slate-50 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setShowNotifications(false);
                        onNavigate?.('/announcements');
                      }}
                      className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-800">{n.title}</span>
                        {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />}
                      </div>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Student Avatar & Menu */}
        <div className="relative pl-2 border-l border-slate-200">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            <Avatar
              src={student.avatarUrl}
              alt={student.name}
              fallback={student.preferredName.charAt(0)}
              size="md"
              status="online"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                {student.name}
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </span>
              <span className="text-[10px] text-slate-400 font-mono">{student.studentId}</span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800 truncate">{student.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{student.email}</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate?.('/profile');
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer text-left"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate?.('/settings/account');
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 cursor-pointer text-left"
              >
                <Settings className="w-3.5 h-3.5 text-slate-400" />
                <span>Account Settings</span>
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate?.('/logout');
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 cursor-pointer text-left"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-500" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
