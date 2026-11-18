export type TicketStatus = 'Open' | 'In Review' | 'Resolved' | 'Closed';
export type TicketPriority = 'Urgent' | 'High' | 'Medium' | 'Low';

export interface SupportTicket {
  id: string;
  studentId: string;
  category: 'Academics' | 'Hostel' | 'Finance' | 'IT / Portal' | 'Grievance';
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
}
