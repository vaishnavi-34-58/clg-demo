import { FeeItem } from '../types/finance';

export const MOCK_FEE_ITEMS: FeeItem[] = [
  {
    id: 'fee_01',
    title: 'Semester 3 Tuition Fee',
    term: 'Fall 2023 - 2024',
    amount: 4200,
    dueDate: 'Sep 15, 2023',
    paidDate: 'Sep 10, 2023',
    status: 'Paid',
    receiptNumber: 'RCPT-2023-8821',
  },
  {
    id: 'fee_02',
    title: 'Design Studio Lab Fee',
    term: 'Fall 2023 - 2024',
    amount: 450,
    dueDate: 'Sep 20, 2023',
    paidDate: 'Sep 18, 2023',
    status: 'Paid',
    receiptNumber: 'RCPT-2023-8899',
  },
  {
    id: 'fee_03',
    title: 'Semester 4 Tuition Fee (Advance)',
    term: 'Spring 2024',
    amount: 4200,
    dueDate: 'Jan 30, 2024',
    status: 'Pending',
  },
];
