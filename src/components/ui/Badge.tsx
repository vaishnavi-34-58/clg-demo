import React from 'react';
import { cn } from '../../utils/cn';

export type BadgeVariant = 'completed' | 'upcoming' | 'inProgress' | 'notStarted' | 'notSubmitted' | 'default';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const variantClasses: Record<BadgeVariant, string> = {
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    upcoming: 'bg-sky-50 text-sky-700 border-sky-200',
    inProgress: 'bg-purple-50 text-purple-700 border-purple-200',
    notStarted: 'bg-rose-50 text-rose-700 border-rose-200',
    notSubmitted: 'bg-amber-50 text-amber-700 border-amber-200',
    default: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
