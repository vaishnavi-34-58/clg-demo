import { EnrolledCourse } from '../types/course';

/**
 * Mock Enrolled Courses directly from the reference dashboard
 */
export const MOCK_ENROLLED_COURSES: EnrolledCourse[] = [
  {
    id: 'crs_art101',
    courseCode: 'ART101',
    courseName: 'Graphic Fundamentals',
    instructor: 'Prof. Smith',
    scheduleDays: 'Monday & Wednesday',
    scheduleTime: '9:00 AM - 10:30 AM',
    location: 'Design Studio A',
    colorVariant: 'purple',
    credits: 3,
    attendancePercentage: 94,
  },
  {
    id: 'crs_itd201',
    courseCode: 'ITD201',
    courseName: 'Advanced Web Design',
    instructor: 'Dr. Johnson',
    scheduleDays: 'Tuesday & Thursday',
    scheduleTime: '1:30 PM - 3:00 PM',
    location: 'Computer Lab 3',
    colorVariant: 'yellow',
    credits: 4,
    attendancePercentage: 91,
  },
  {
    id: 'crs_uxd301',
    courseCode: 'UXD301',
    courseName: 'User Experience Research',
    instructor: 'Prof. Davis',
    scheduleDays: 'Monday & Saturday',
    scheduleTime: '11:00 AM - 12:30 PM',
    location: 'Design Lab 2',
    colorVariant: 'cyan',
    credits: 3,
    attendancePercentage: 88,
  },
  {
    id: 'crs_ani301',
    courseCode: 'ANI301',
    courseName: '3D Animation Techniques',
    instructor: 'Dr. Martinez',
    scheduleDays: 'Wednesday',
    scheduleTime: '2:00 PM - 5:00 PM',
    location: 'Animation Studio',
    colorVariant: 'mint',
    credits: 4,
    attendancePercentage: 96,
  },
];
