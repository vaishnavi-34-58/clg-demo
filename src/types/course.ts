/**
 * Course and Subject Domain Types
 */

export type CourseColorAccent = 'purple' | 'yellow' | 'cyan' | 'mint' | 'orange';

export interface EnrolledCourse {
  id: string;
  courseCode: string; // e.g. "ART101"
  code?: string;
  courseName: string; // e.g. "Graphic Fundamentals"
  title?: string;
  instructor: string; // e.g. "Prof. Smith"
  scheduleDays: string; // e.g. "Monday & Wednesday"
  schedule?: string;
  scheduleTime: string; // e.g. "9:00 AM - 10:30 AM"
  time?: string;
  location: string; // e.g. "Design Studio A"
  colorVariant: CourseColorAccent;
  credits: number;
  syllabusUrl?: string;
  attendancePercentage?: number;
  enrolledStudentsCount?: number;
}
