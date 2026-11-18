import { EnrolledCourse } from '../../types/course';
import { ExamRecord } from '../../types/examination';
import { HomeworkItem } from '../../types/assignment';
import { StudentProfile } from '../../types/student';

export interface DashboardViewModel {
  student: StudentProfile;
  enrolledCourses: EnrolledCourse[];
  examRecords: ExamRecord[];
  homeworks: HomeworkItem[];
}
