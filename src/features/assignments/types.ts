import { HomeworkItem } from '../../types/assignment';

export interface AssignmentFilter {
  status?: HomeworkItem['status'];
  courseCode?: string;
}

export type { HomeworkItem };
