/**
 * Centralized Application Route Definitions
 */

export const APP_ROUTES = {
  // Core
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',

  // Academic Modules
  SCHEDULE: '/schedule',
  EXAM_BOARD: '/exam-board',
  HOMEWORKS: '/homeworks',
  GRADE_REPORT: '/grade-report',
  ENROLLED_COURSES: '/enrolled-courses',
  COURSE_PLAN: '/course-plan',
  ATTENDANCE: '/attendance',
  LIBRARIES: '/libraries',

  // Administrative & Student Services
  FINANCE: '/finance',
  ANNOUNCEMENTS: '/announcements',
  LEAVE: '/leave',
  EVENTS: '/events',
  HOSTEL: '/hostel',
  TRANSPORT: '/transport',
  CERTIFICATES: '/certificates',
  GRIEVANCES: '/grievances',
  PLACEMENTS: '/placements',

  // Settings & Account
  ACCOUNT_SETTINGS: '/settings/account',
  NOTIFICATION_PREFERENCES: '/settings/notifications',
  LOGOUT: '/logout',
} as const;

export type AppRoute = typeof APP_ROUTES[keyof typeof APP_ROUTES];
