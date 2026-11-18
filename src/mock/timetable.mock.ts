export interface TimetableSlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  courseCode: string;
  courseName: string;
  room: string;
  instructor: string;
}

export const MOCK_TIMETABLE_SLOTS: TimetableSlot[] = [
  {
    id: 'slot_1',
    day: 'Monday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    courseCode: 'ART101',
    courseName: 'Graphic Fundamentals',
    room: 'Design Studio A',
    instructor: 'Prof. Smith',
  },
  {
    id: 'slot_2',
    day: 'Monday',
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    courseCode: 'UXD301',
    courseName: 'User Experience Research',
    room: 'Design Lab 2',
    instructor: 'Prof. Davis',
  },
  {
    id: 'slot_3',
    day: 'Tuesday',
    startTime: '01:30 PM',
    endTime: '03:00 PM',
    courseCode: 'ITD201',
    courseName: 'Advanced Web Design',
    room: 'Computer Lab 3',
    instructor: 'Dr. Johnson',
  },
  {
    id: 'slot_4',
    day: 'Wednesday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    courseCode: 'ART101',
    courseName: 'Graphic Fundamentals',
    room: 'Design Studio A',
    instructor: 'Prof. Smith',
  },
  {
    id: 'slot_5',
    day: 'Wednesday',
    startTime: '02:00 PM',
    endTime: '05:00 PM',
    courseCode: 'ANI301',
    courseName: '3D Animation Techniques',
    room: 'Animation Studio',
    instructor: 'Dr. Martinez',
  },
  {
    id: 'slot_6',
    day: 'Thursday',
    startTime: '01:30 PM',
    endTime: '03:00 PM',
    courseCode: 'ITD201',
    courseName: 'Advanced Web Design',
    room: 'Computer Lab 3',
    instructor: 'Dr. Johnson',
  },
  {
    id: 'slot_7',
    day: 'Saturday',
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    courseCode: 'UXD301',
    courseName: 'User Experience Research',
    room: 'Design Lab 2',
    instructor: 'Prof. Davis',
  },
];
