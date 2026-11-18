import { AttendanceRecord } from '../types/attendance';

export const MOCK_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    courseId: 'crs_art101',
    courseCode: 'ART101',
    courseName: 'Graphic Fundamentals',
    totalLectures: 32,
    attendedLectures: 30,
    percentage: 94,
    lastUpdated: 'Jan 12, 2024',
    status: 'Good',
  },
  {
    courseId: 'crs_itd201',
    courseCode: 'ITD201',
    courseName: 'Advanced Web Design',
    totalLectures: 30,
    attendedLectures: 27,
    percentage: 90,
    lastUpdated: 'Jan 11, 2024',
    status: 'Good',
  },
  {
    courseId: 'crs_uxd301',
    courseCode: 'UXD301',
    courseName: 'User Experience Research',
    totalLectures: 28,
    attendedLectures: 25,
    percentage: 89,
    lastUpdated: 'Jan 10, 2024',
    status: 'Good',
  },
  {
    courseId: 'crs_ani301',
    courseCode: 'ANI301',
    courseName: '3D Animation Techniques',
    totalLectures: 26,
    attendedLectures: 25,
    percentage: 96,
    lastUpdated: 'Jan 12, 2024',
    status: 'Good',
  },
];
