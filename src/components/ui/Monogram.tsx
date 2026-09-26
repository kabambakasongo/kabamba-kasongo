import { cn } from '@/utils/cn';
import { profile } from '@/config/profile';

interface MonogramProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Affiche un anneau conique animé autour du monogramme. */
  ring?: boolean;
}

const sizes = {
  sm: 'size-9 text-xs rounded-lg',
  md: 'size-11 text-sm rounded-xl',
  lg: 'size-20 text-2xl rounded-2xl',
} as const;

/** Marque_personnelle : monogramme KK sur gradient de marque. */
export function Monogram({ size = 'md', className, ring = false }: MonogramProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'from-brand to-brand-strong font-display text-brand-contrast relative grid shrink-0 place-items-center bg-gradient-to-br font-bold select-none',
        'shadow-brand/20 shadow-lg',
        sizes[size],
        ring && 'halo',
        className,
      )}
    >
      {profile.initials}
    </span>
  );
}
