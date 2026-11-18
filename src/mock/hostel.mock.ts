export interface HostelDetails {
  hostelName: string;
  block: string;
  roomNumber: string;
  bedNumber: string;
  roomType: string;
  wardenName: string;
  wardenPhone: string;
  wardenEmail: string;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  feeAmount: number;
  roommates: {
    name: string;
    studentId: string;
    course: string;
  }[];
  complaints: {
    id: string;
    category: string;
    description: string;
    date: string;
    status: 'Resolved' | 'In Progress' | 'Pending';
  }[];
}

export const MOCK_HOSTEL_DATA: HostelDetails = {
  hostelName: 'Utopia North Residence Hall',
  block: 'Block B - Wing 3',
  roomNumber: '304',
  bedNumber: 'Bed A',
  roomType: 'Double Occupancy (Air Conditioned)',
  wardenName: 'Dr. Arthur Bell',
  wardenPhone: '+1 (555) 728-1920',
  wardenEmail: 'warden.north@utopia.edu',
  feeStatus: 'Paid',
  feeAmount: 1250,
  roommates: [
    {
      name: 'Julian Rivera',
      studentId: 'UTP-2023-3921',
      course: 'B.Sc. Web Engineering',
    },
  ],
  complaints: [
    {
      id: 'CMP-2024-019',
      category: 'Air Conditioning Maintenance',
      description: 'Cooling unit filter servicing completed in Room 304.',
      date: 'Jan 05, 2024',
      status: 'Resolved',
    },
    {
      id: 'CMP-2024-032',
      category: 'Study Lamp Replacement',
      description: 'Desk lighting fixture replacement requested.',
      date: 'Jan 11, 2024',
      status: 'In Progress',
    },
  ],
};
