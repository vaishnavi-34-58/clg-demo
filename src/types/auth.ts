/**
 * Authentication and Role definitions
 * Complete Role-Based Access Control for College ERP
 */

export type ManagementRole =
  | 'SUPER_ADMIN'
  | 'PRINCIPAL'
  | 'HOD'
  | 'FACULTY'
  | 'EXAM_CONTROLLER'
  | 'ADMISSION_MGMT'
  | 'ACCOUNTS_MGMT'
  | 'HOSTEL_MGMT'
  | 'TRANSPORT_MGMT'
  | 'LIBRARY_MGMT'
  | 'PLACEMENT_OFFICER'
  | 'STUDENT_AFFAIRS';

export type UserRole = 'STUDENT' | 'ADMIN' | 'MANAGEMENT' | ManagementRole;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
  designation?: string;
  phone?: string;
}

export interface ManagementCredential {
  role: ManagementRole;
  roleTitle: string;
  category: 'Leadership & Academic' | 'Operations & Facilities' | 'Student Services & Admissions';
  name: string;
  email: string;
  password: string;
  department: string;
  description: string;
  badgeColor: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  activeRole: UserRole;
}
