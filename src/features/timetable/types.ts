import { TimetableSlot } from '../../mock/timetable.mock';

export interface WeeklyTimetable {
  slots: TimetableSlot[];
  activeDay: string;
}

export type { TimetableSlot };
