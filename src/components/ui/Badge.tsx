import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'dante' | 'ravenna' | 'passive';
}

const tones = {
  dante: 'border-[#1D9E75] bg-[rgba(29,158,117,0.15)] text-[#1D9E75]',
  ravenna: 'border-[#EF9F27] bg-[rgba(239,159,39,0.15)] text-[#EF9F27]',
  passive: 'border-[#6B7280] bg-[rgba(107,114,128,0.15)] text-[#9CA3AF]',
};

export function Badge({ children, tone = 'passive' }: BadgeProps) {
  return (
    <span className={`inline-flex rounded-full border px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${tones[tone]}`}>
      {children}
    </span>
  );
}