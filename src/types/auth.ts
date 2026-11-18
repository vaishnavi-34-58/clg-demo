/**
 * Authentication and Role definitions
 * Supports multi-role scalability (Student, Faculty, HOD, Admin, Management)
 */

export type UserRole = 'STUDENT' | 'FACULTY' | 'HOD' | 'ADMIN' | 'MANAGEMENT';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  activeRole: UserRole;
}
