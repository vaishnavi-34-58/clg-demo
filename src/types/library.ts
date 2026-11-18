/**
 * Library Domain Types
 */

export interface LibraryBook {
  id: string;
  isbn: string;
  title: string;
  author: string;
  issueDate: string;
  dueDate: string;
  status: 'Issued' | 'Returned' | 'Overdue';
  fineAmount?: number;
}
