export interface GrievanceTicket {
  id: string;
  ticketNumber?: string;
  category: 'Academics' | 'Hostel' | 'Finance' | 'IT / Portal' | 'Library' | 'General';
  subject: string;
  description: string;
  submittedDate: string;
  filedDate?: string;
  status: 'Resolved' | 'In Review' | 'Open' | 'In Progress';
  priority: 'High' | 'Medium' | 'Low';
  response?: string;
  respondedBy?: string;
}

export const MOCK_GRIEVANCES: GrievanceTicket[] = [
  {
    id: 'GRV-2024-008',
    category: 'IT / Portal',
    subject: 'Design Studio Wi-Fi Bandwidth drop in Afternoon',
    description: 'During 3D rendering sessions in Design Studio A, campus Wi-Fi throttles significantly.',
    submittedDate: 'Jan 08, 2024',
    status: 'Resolved',
    priority: 'Medium',
    response: 'Campus IT installed a dedicated Wi-Fi 6 access point in Design Studio A.',
    respondedBy: 'Chief Information Officer - Student IT Services',
  },
  {
    id: 'GRV-2024-012',
    category: 'Library',
    subject: 'Request for additional copies of UI/UX reference textbooks',
    description: 'Design of Everyday Things has only 3 copies in the central reserve section.',
    submittedDate: 'Jan 10, 2024',
    status: 'In Review',
    priority: 'Low',
    response: 'Library committee has ordered 5 additional copies for Spring semester reserves.',
    respondedBy: 'Head Librarian',
  },
];
