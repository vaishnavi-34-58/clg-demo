import { FeeItem } from '../../types/finance';

export interface FeeSummary {
  totalFee: number;
  paidAmount: number;
  pendingAmount: number;
  overdueAmount: number;
}

export type { FeeItem };
