import { ExamRecord } from '../../types/examination';

export interface ExamFilter {
  status?: ExamRecord['status'];
  courseCode?: string;
}

export type { ExamRecord };
