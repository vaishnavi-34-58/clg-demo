import { UserRole } from '../types/auth';

export const USER_ROLES: Record<string, UserRole> = {
  STUDENT: 'STUDENT',
  FACULTY: 'FACULTY',
  HOD: 'HOD',
  ADMIN: 'ADMIN',
  MANAGEMENT: 'MANAGEMENT',
} as const;

export const DEFAULT_PORTAL_ROLE: UserRole = USER_ROLES.STUDENT;
