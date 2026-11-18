import { Announcement } from '../types/announcement';

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc_01',
    title: 'Spring 2024 Course Registration Deadline',
    category: 'Academic',
    date: 'Jan 10, 2024',
    summary: 'All undergraduate students must finalize course electives for Spring 2024 by Jan 20.',
    author: 'Academic Registrar',
    priority: 'High',
  },
  {
    id: 'anc_02',
    title: 'Annual Design Expo & Student Exhibition',
    category: 'Campus',
    date: 'Jan 08, 2024',
    summary: 'Submissions for the Annual Utopia Student Design Showcase are now open.',
    author: 'School of Arts & Media',
    priority: 'Normal',
  },
];
