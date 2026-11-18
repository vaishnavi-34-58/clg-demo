import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  accentColor?: 'purple' | 'yellow' | 'cyan' | 'mint' | 'orange';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  accentColor,
  ...props
}) => {
  const accentClasses = {
    purple: 'border-l-4 border-l-purple-500',
    yellow: 'border-l-4 border-l-amber-400',
    cyan: 'border-l-4 border-l-sky-500',
    mint: 'border-l-4 border-l-emerald-500',
    orange: 'border-l-4 border-l-orange-500',
  };

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-slate-100 shadow-xs overflow-hidden',
        accentColor && accentClasses[accentColor],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
