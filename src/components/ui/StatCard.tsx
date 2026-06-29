import type { ReactNode } from 'react';
import { Card } from './Card';

interface StatCardProps {
  value: string;
  label: string;
  suffix?: string;
  className?: string;
  icon?: ReactNode;
}

export function StatCard({ value, label, suffix, className = '', icon }: StatCardProps) {
  return (
    <Card className={`p-5 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-3xl font-semibold tracking-tight text-gold400">
            {value}
            {suffix ?? ''}
          </div>
          <p className="mt-2 text-sm text-textSecondary">{label}</p>
        </div>
        {icon ? <div className="text-gold400">{icon}</div> : null}
      </div>
    </Card>
  );
}