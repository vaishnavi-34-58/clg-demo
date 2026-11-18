export interface NavItem {
  id: string;
  label: string;
  path: string;
  iconName: string;
  badge?: string;
}

export interface NavSection {
  sectionTitle?: string;
  items: NavItem[];
}

export const STUDENT_NAV_SECTIONS: NavSection[] = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', path: '/dashboard', iconName: 'LayoutDashboard' },
      { id: 'profile', label: 'My Profile', path: '/profile', iconName: 'User' },
    ],
  },
  {
    sectionTitle: 'ACADEMIC',
    items: [
      { id: 'schedule', label: 'Schedule', path: '/schedule', iconName: 'Calendar' },
      { id: 'exam-board', label: 'Exam Board', path: '/exam-board', iconName: 'FileText' },
      { id: 'homeworks', label: 'Homeworks', path: '/homeworks', iconName: 'BookOpen', badge: '5' },
      { id: 'grade-report', label: 'Grade Report', path: '/grade-report', iconName: 'GraduationCap' },
      { id: 'enrolled-courses', label: 'Enrolled Courses', path: '/enrolled-courses', iconName: 'Layers' },
      { id: 'course-plan', label: 'Course Plan', path: '/course-plan', iconName: 'Map' },
      { id: 'attendance', label: 'Attendance', path: '/attendance', iconName: 'CheckSquare', badge: '92%' },
      { id: 'libraries', label: 'Libraries', path: '/libraries', iconName: 'Library' },
    ],
  },
  {
    sectionTitle: 'ADMINISTRATIVE',
    items: [
      { id: 'finance', label: 'Finance', path: '/finance', iconName: 'CreditCard' },
      { id: 'announcements', label: 'Announcements', path: '/announcements', iconName: 'Bell', badge: '2' },
      { id: 'leave', label: 'Leave Applications', path: '/leave', iconName: 'CalendarOff' },
      { id: 'events', label: 'Events & Clubs', path: '/events', iconName: 'Sparkles' },
      { id: 'hostel', label: 'Hostel Management', path: '/hostel', iconName: 'Building2' },
      { id: 'transport', label: 'Transport Service', path: '/transport', iconName: 'Bus' },
      { id: 'certificates', label: 'Certificates & Documents', path: '/certificates', iconName: 'Award' },
      { id: 'grievances', label: 'Feedback & Grievances', path: '/grievances', iconName: 'AlertCircle' },
      { id: 'placements', label: 'Career & Placements', path: '/placements', iconName: 'Briefcase' },
    ],
  },
  {
    sectionTitle: 'SETTINGS',
    items: [
      { id: 'account-settings', label: 'Account Settings', path: '/settings/account', iconName: 'Settings' },
      { id: 'notification-preferences', label: 'Notification Preferences', path: '/settings/notifications', iconName: 'BellRing' },
    ],
  },
];
