import { ExamRecord } from '../types/examination';

/**
 * Mock Examination records matching the reference Exam Board table
 */
export const MOCK_EXAM_RECORDS: ExamRecord[] = [
  {
    id: 'ex_01',
    examName: 'Graphic Design Fundamentals',
    courseCode: 'ART101',
    date: 'Jan 25, 2024',
    time: '10:00 AM',
    location: 'Design Studio A',
    status: 'Completed',
    grade: 'A',
  },
  {
    id: 'ex_02',
    examName: 'Digital Illustration',
    courseCode: 'ART103',
    date: 'Feb 5, 2024',
    time: '02:00 PM',
    location: 'Computer Lab 2',
    status: 'Completed',
    grade: 'A-',
  },
  {
    id: 'ex_03',
    examName: 'UX/UI Design Principles',
    courseCode: 'UXD301',
    date: 'Mar 10, 2024',
    time: '01:00 PM',
    location: 'Design Lab 1',
    status: 'Upcoming',
  },
  {
    id: 'ex_04',
    examName: 'History of Design Essay',
    courseCode: 'ART101',
    date: 'Apr 2, 2024',
    time: '09:45 AM',
    location: 'Lecture Hall B',
    status: 'Upcoming',
  },
  {
    id: 'ex_05',
    examName: 'Product Design Prototype',
    courseCode: 'ITD201',
    date: 'May 15, 2024',
    time: '11:15 AM',
    location: 'Prototype Lab',
    status: 'Upcoming',
  },
  {
    id: 'ex_06',
    examName: 'Color Theory and Application',
    courseCode: 'ART103',
    date: 'June 8, 2024',
    time: '02:15 PM',
    location: 'Design Studio B',
    status: 'Upcoming',
  },
  {
    id: 'ex_07',
    examName: 'Visual Communication Design',
    courseCode: 'ART202',
    date: 'Nov 20, 2024',
    time: '2:00 PM',
    location: 'Design Studio B',
    status: 'Upcoming',
  },
];
