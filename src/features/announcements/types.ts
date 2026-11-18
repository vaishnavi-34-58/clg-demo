import { Announcement } from '../../types/announcement';

export interface AnnouncementFilter {
  category?: Announcement['category'];
  unreadOnly?: boolean;
}

export type { Announcement };
