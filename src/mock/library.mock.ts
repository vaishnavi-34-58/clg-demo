import { LibraryBook } from '../types/library';

export const MOCK_LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: 'bk_01',
    isbn: '978-0134852744',
    title: 'Designing Interfaces: Patterns for Effective Interaction Design',
    author: 'Jenifer Tidwell',
    issueDate: 'Jan 04, 2024',
    dueDate: 'Jan 25, 2024',
    status: 'Issued',
  },
  {
    id: 'bk_02',
    isbn: '978-0262037709',
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    issueDate: 'Dec 12, 2023',
    dueDate: 'Jan 02, 2024',
    status: 'Returned',
  },
];
