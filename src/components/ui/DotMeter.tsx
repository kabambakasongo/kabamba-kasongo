import { cn } from '@/utils/cn';

interface DotMeterProps {
  /** Niveau de 1 a 5. */
  level: 1 | 2 | 3 | 4 | 5;
  label: string;
  className?: string;
  size?: 'sm' | 'md';
}

/**
 * Jauge de competence en pastilles (5 crans).
 * Evite les barres de progression classiques et reste lisible
 * meme en mode "prefers-reduced-motion".
 */
export function DotMeter({ level, label, className, size = 'md' }: DotMeterProps) {
  const dotSize = size === 'sm' ? 'size-1.5' : 'size-2';

  return (
    <span
      className={cn('flex items-center gap-1', className)}
      role="img"
      aria-label={`${label} : niveau ${level} sur 5`}
    >
      {[1, 2, 3, 4, 5].map((step) => (
        <span
          key={step}
          className={cn(
            'rounded-full transition-colors duration-300',
            dotSize,
            step <= level ? 'bg-brand' : 'bg-line-strong',
          )}
        />
      ))}
    </span>
  );
}
