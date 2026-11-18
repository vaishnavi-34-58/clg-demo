/**
 * Attendance Domain Types
 */

export interface AttendanceRecord {
  courseId: string;
  courseCode: string;
  courseName: string;
  totalLectures: number;
  attendedLectures: number;
  percentage: number;
  lastUpdated: string;
  status: 'Good' | 'Warning' | 'Critical';
}
