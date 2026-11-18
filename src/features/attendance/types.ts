import { AttendanceRecord } from '../../types/attendance';

export interface AttendanceFilter {
  semester?: number;
  courseCode?: string;
}

export type { AttendanceRecord };
