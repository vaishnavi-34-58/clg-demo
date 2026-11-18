export interface AcademicReport {
  studentId: string;
  semester: number;
  gpa: number;
  cgpa: number;
  totalCreditsEarned: number;
  gradeBreakdown: Record<string, string>;
}
