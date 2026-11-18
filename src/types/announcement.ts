/**
 * Announcements and Notifications Domain Types
 */

export type AnnouncementCategory = 'Academic' | 'Campus' | 'Exam' | 'Administrative' | 'Emergency';

export interface Announcement {
  id: string;
  title: string;
  category: AnnouncementCategory;
  date: string;
  summary: string;
  author: string;
  isRead?: boolean;
  priority: 'High' | 'Normal' | 'Low';
}
