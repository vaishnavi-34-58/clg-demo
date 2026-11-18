import { StudentProfile } from '../../types/student';

export interface ProfileUpdatePayload {
  preferredName?: string;
  phone?: string;
  emergencyContact?: string;
  address?: string;
}

export type { StudentProfile };
