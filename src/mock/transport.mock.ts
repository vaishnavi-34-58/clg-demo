export interface TransportDetails {
  routeNumber: string;
  routeName: string;
  busNumber: string;
  pickupPoint: string;
  pickupTime: string;
  dropTime: string;
  driverName: string;
  driverPhone: string;
  passStatus: 'Active' | 'Expired' | 'Suspended';
  validUntil: string;
  feeAmount: number;
  stops: {
    stopName: string;
    morningTime: string;
    eveningTime: string;
  }[];
}

export const MOCK_TRANSPORT_DATA: TransportDetails = {
  routeNumber: 'Route 12',
  routeName: 'Downtown & Metro West Express',
  busNumber: 'UT-BUS-08',
  pickupPoint: 'Oakridge Central Metro Station (Gate 2)',
  pickupTime: '07:45 AM',
  dropTime: '05:20 PM',
  driverName: 'Mr. Robert Harris',
  driverPhone: '+1 (555) 674-2911',
  passStatus: 'Active',
  validUntil: 'May 31, 2024',
  feeAmount: 650,
  stops: [
    { stopName: 'Oakridge Central Station', morningTime: '07:45 AM', eveningTime: '05:20 PM' },
    { stopName: 'Hillcrest Blvd Crossing', morningTime: '08:00 AM', eveningTime: '05:05 PM' },
    { stopName: 'Grand Avenue Square', morningTime: '08:15 AM', eveningTime: '04:50 PM' },
    { stopName: 'Utopia Campus Terminal', morningTime: '08:35 AM', eveningTime: '04:30 PM' },
  ],
};
