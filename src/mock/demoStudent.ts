import { StudentProfile } from '../types/student';

/**
 * Centralized Demo Student Configuration
 * Matches the reference student profile ('Merna', Semester 3 of 8)
 */
export const DEMO_STUDENT: StudentProfile = {
  id: 'stu_01hm89432x',
  studentId: 'UTP-2023-4182',
  name: 'Merna Vance',
  preferredName: 'Merna',
  email: 'merna.vance@student.utopia.edu',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  program: 'B.Sc. Interactive Design & Digital Media',
  department: 'Faculty of Design & Computing',
  currentSemester: 3,
  totalSemesters: 8,
  academicYear: '2023 - 2024',
  cgpa: 3.84,
  advisorName: 'Dr. Rebecca Martinez',
  phone: '+1 (555) 382-9912',
  emergencyContact: '+1 (555) 902-1144',
  address: '42 Campus Way, North Hall, Room 304',
};

export const DEMO_PORTAL_BANNER = {
  title: 'Get Involved – Join a Club Today!',
  description:
    'Explore your interests and meet like-minded students by joining one of our many clubs. Whether you\'re into sports, arts, or academics, there\'s a club for you. Find your community!',
  actionText: 'Learn More',
  actionUrl: '/events/clubs',
};
