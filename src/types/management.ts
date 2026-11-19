import { ManagementRole } from './auth';

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseApplied: string;
  appliedProgram?: string;
  category: 'Undergraduate' | 'Postgraduate' | 'Diploma';
  previousGpa: number;
  documentsVerified: boolean;
  status: 'Pending Review' | 'Documents Verified' | 'Approved' | 'Rejected' | 'UNDER_REVIEW' | 'SUBMITTED' | 'APPROVED' | 'ENROLLED';
  appliedDate: string;
  submittedDate?: string;
  entranceScore?: number;
  score?: string | number;
  documents?: string[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  role: ManagementRole;
  userName: string;
  action: string;
  module: string;
  details: string;
  status: 'SUCCESS' | 'WARNING' | 'INFO';
}

export interface Department {
  id: string;
  code: string;
  name: string;
  hodName: string;
  facultyCount: number;
  studentCount: number;
  programsOffered: string[];
  programs?: string[];
  budget?: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  assignedCourses: string[];
  phone: string;
  cabin: string;
  officeRoom?: string;
  avatarUrl?: string;
  status: 'Active' | 'On Leave';
}
