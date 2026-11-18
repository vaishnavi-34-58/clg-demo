import React from 'react';
import { cn } from '../../utils/cn';

export interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  label,
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, (current / total) * 100));

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between items-center mb-1 text-xs text-slate-600 font-medium">
          <span>{label}</span>
          <span>{`${current}/${total}`}</span>
        </div>
      )}
      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-slate-900 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
