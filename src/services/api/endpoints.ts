/**
 * Central API Endpoints definition
 * Ready for future backend integration
 */

export const API_ENDPOINTS = {
  auth: {
    login: '/api/v1/auth/login',
    logout: '/api/v1/auth/logout',
    me: '/api/v1/auth/me',
  },
  student: {
    profile: '/api/v1/student/profile',
    academicSummary: '/api/v1/student/academic-summary',
  },
  courses: {
    enrolled: '/api/v1/courses/enrolled',
    details: (courseId: string) => `/api/v1/courses/${courseId}`,
    syllabus: (courseId: string) => `/api/v1/courses/${courseId}/syllabus`,
  },
  examinations: {
    schedule: '/api/v1/examinations/schedule',
    results: '/api/v1/examinations/results',
  },
  assignments: {
    list: '/api/v1/assignments',
    submit: (id: string) => `/api/v1/assignments/${id}/submit`,
  },
  attendance: {
    summary: '/api/v1/attendance/summary',
    subjectWise: (courseId: string) => `/api/v1/attendance/subject/${courseId}`,
  },
  finance: {
    ledger: '/api/v1/finance/ledger',
    pay: '/api/v1/finance/pay',
  },
  library: {
    issuedBooks: '/api/v1/library/issued',
    catalog: '/api/v1/library/catalog',
  },
  announcements: {
    list: '/api/v1/announcements',
  },
} as const;
