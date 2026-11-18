import { EnrolledCourse } from '../../types/course';

export interface CourseDetailViewModel extends EnrolledCourse {
  description?: string;
  prerequisites?: string[];
  learningOutcomes?: string[];
}

export type { EnrolledCourse };
