/**
 * Examination Domain Types
 */

export type ExamStatus = 'Completed' | 'Upcoming' | 'Ongoing' | 'Postponed';

export interface ExamRecord {
  id: string;
  examName: string; // e.g. "Graphic Design Fundamentals"
  courseCode: string; // e.g. "ART101"
  date: string; // e.g. "Jan 25, 2024"
  time: string; // e.g. "10:00 AM"
  location: string; // e.g. "Design Studio A"
  status: ExamStatus;
  maxMarks?: number;
  obtainedMarks?: number;
  grade?: string;
}
