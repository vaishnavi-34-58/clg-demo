import { HomeworkItem } from '../types/assignment';

/**
 * Mock Homeworks and Assignments matching the reference Homeworks widget
 */
export const MOCK_HOMEWORK_ITEMS: HomeworkItem[] = [
  {
    id: 'hw_01',
    courseTitle: 'Graphic Fundamentals',
    courseCode: 'ART101',
    assignmentTitle: 'Design Project 1',
    dueDate: 'February 10, 2024',
    status: 'Not Submitted',
    points: 100,
  },
  {
    id: 'hw_02',
    courseTitle: 'Advanced Web Design',
    courseCode: 'ITD201',
    assignmentTitle: 'Responsive Website Project',
    dueDate: 'March 5, 2024',
    status: 'Completed',
    points: 100,
    score: 95,
  },
  {
    id: 'hw_03',
    courseTitle: 'User Experience Research',
    courseCode: 'UXD301',
    assignmentTitle: 'Usability Testing Report',
    dueDate: 'April 15, 2024',
    status: 'In Progress',
    points: 50,
  },
  {
    id: 'hw_04',
    courseTitle: 'Digital Photography',
    courseCode: 'PHO201',
    assignmentTitle: 'Photojournalism Project',
    dueDate: 'April 8, 2024',
    status: 'Not Started',
    points: 80,
  },
  {
    id: 'hw_05',
    courseTitle: '3D Animation',
    courseCode: 'ANI301',
    assignmentTitle: 'Character Animation Project',
    dueDate: 'May 20, 2024',
    status: 'Not Submitted',
    points: 100,
  },
];
