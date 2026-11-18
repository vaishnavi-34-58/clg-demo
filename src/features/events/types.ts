export interface CampusEvent {
  id: string;
  title: string;
  clubName: string;
  category: 'Sports' | 'Arts' | 'Tech' | 'Academic' | 'Social';
  date: string;
  time: string;
  venue: string;
  description: string;
  bannerUrl?: string;
  registrationOpen: boolean;
}
