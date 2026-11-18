import { LibraryBook } from '../../types/library';

export interface LibrarySummary {
  issuedCount: number;
  overdueCount: number;
  totalFines: number;
}

export type { LibraryBook };
