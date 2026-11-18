/**
 * Assignment and Homework Domain Types
 */

export type HomeworkStatus = 'Completed' | 'In Progress' | 'Not Submitted' | 'Not Started';

export interface HomeworkItem {
  id: string;
  courseTitle: string; // e.g. "Graphic Fundamentals"
  courseCode: string; // e.g. "ART101"
  assignmentTitle: string; // e.g. "Design Project 1"
  dueDate: string; // e.g. "February 10, 2024"
  status: HomeworkStatus;
  points?: number;
  submissionDate?: string;
  score?: number;
  maxScore?: number;
}
