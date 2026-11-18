/**
 * Student Domain Types
 */

export interface StudentProfile {
  id: string;
  studentId: string; // e.g. "STU-2024-0089"
  name: string;
  preferredName: string;
  email: string;
  avatarUrl: string;
  program: string; // e.g. "Bachelor of Design & Interactive Media"
  department: string; // e.g. "School of Art & Design"
  currentSemester: number; // e.g. 3
  totalSemesters: number; // e.g. 8
  academicYear: string; // e.g. "2023 - 2024"
  cgpa: number;
  advisorName: string;
  phone?: string;
  emergencyContact?: string;
  address?: string;
}
