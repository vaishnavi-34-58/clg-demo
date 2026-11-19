export interface PlacementDrive {
  id: string;
  companyName: string;
  company?: string;
  companyLogo?: string;
  logoUrl?: string;
  role: string;
  location?: string;
  ctc: string;
  driveDate?: string;
  minCgpa: number;
  eligibleBranches: string[];
  status: 'Applied' | 'Eligible' | 'Shortlisted' | 'Not Eligible' | 'Open' | 'Interview Scheduled';
  applicationDeadline?: string;
  deadline?: string;
  interviewDate?: string;
  description?: string;
}

export const MOCK_PLACEMENT_DRIVES: PlacementDrive[] = [
  {
    id: 'PLC-2024-01',
    companyName: 'Figma Systems',
    role: 'Product Design Intern (Summer 2024)',
    location: 'San Francisco, CA / Remote',
    ctc: '$52,000 / yr',
    driveDate: 'Feb 15, 2024',
    minCgpa: 3.5,
    eligibleBranches: ['Interactive Design', 'Computer Science', 'Web Engineering'],
    status: 'Shortlisted',
    applicationDeadline: 'Jan 20, 2024',
    interviewDate: 'Feb 18, 2024',
  },
  {
    id: 'PLC-2024-02',
    companyName: 'Adobe Creative Cloud',
    role: 'Associate UX / Motion Designer',
    location: 'San Jose, CA',
    ctc: '$85,000 / yr',
    driveDate: 'Mar 02, 2024',
    minCgpa: 3.6,
    eligibleBranches: ['Interactive Design', 'Digital Media', '3D Animation'],
    status: 'Applied',
    applicationDeadline: 'Feb 10, 2024',
  },
  {
    id: 'PLC-2024-03',
    companyName: 'Spotify',
    role: 'Design Technologist Intern',
    location: 'New York, NY',
    ctc: '$60,000 / yr',
    driveDate: 'Mar 22, 2024',
    minCgpa: 3.4,
    eligibleBranches: ['Interactive Design', 'Web Engineering'],
    status: 'Eligible',
    applicationDeadline: 'Feb 25, 2024',
  },
];
