export type LeaveType = 'Medical' | 'Personal' | 'Academic' | 'Duty';
export type LeaveStatus = 'Approved' | 'Pending' | 'Rejected';

export interface LeaveRequest {
  id: string;
  studentId: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
  appliedOn: string;
  reviewedBy?: string;
}
