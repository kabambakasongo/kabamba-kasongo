import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface TagProps {
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'brand' | 'outline';
  title?: string;
}

export function Tag({ children, className, tone = 'default', title }: TagProps) {
  const tones = {
    default: 'bg-surface-2 text-ink-muted border-transparent',
    brand: 'bg-brand-soft text-brand border-brand/25',
    outline: 'border-line text-ink-subtle',
  } as const;

  return (
    <span
      title={title}
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[0.7rem] tracking-wide whitespace-nowrap',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
