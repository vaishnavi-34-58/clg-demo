export interface CertificateRequest {
  id: string;
  certificateType: 'Bonafide Certificate' | 'Study Certificate' | 'Conduct Certificate' | 'Fee Estimation Letter';
  purpose: string;
  appliedDate: string;
  status: 'Approved' | 'In Process' | 'Rejected';
  referenceNumber?: string;
  downloadUrl?: string;
  remarks?: string;
}

export const MOCK_CERTIFICATE_REQUESTS: CertificateRequest[] = [
  {
    id: 'REQ-2024-001',
    certificateType: 'Bonafide Certificate',
    purpose: 'Education Loan Renewal & Metro Student Transit Pass',
    appliedDate: 'Jan 03, 2024',
    status: 'Approved',
    referenceNumber: 'UTP-BON-2024-9182',
    remarks: 'Official digital copy verified and signed by Registrar Office.',
  },
  {
    id: 'REQ-2023-042',
    certificateType: 'Study Certificate',
    purpose: 'Passport Application Verification',
    appliedDate: 'Nov 14, 2023',
    status: 'Approved',
    referenceNumber: 'UTP-STD-2023-4102',
    remarks: 'Issued and archived in student records.',
  },
  {
    id: 'REQ-2024-015',
    certificateType: 'Fee Estimation Letter',
    purpose: 'Scholarship Application for Spring 2024',
    appliedDate: 'Jan 10, 2024',
    status: 'In Process',
    remarks: 'Under review with Finance & Accounts department.',
  },
];
