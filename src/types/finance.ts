/**
 * Finance and Fee Domain Types
 */

export type FeeStatus = 'Paid' | 'Pending' | 'Overdue';

export interface FeeItem {
  id: string;
  title: string;
  term: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: FeeStatus;
  receiptNumber?: string;
  invoiceNumber?: string;
  semester?: string;
}
