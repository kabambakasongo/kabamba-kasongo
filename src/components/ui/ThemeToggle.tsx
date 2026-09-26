import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
  className?: string;
}

export function ThemeToggle({ theme, onToggle, className }: ThemeToggleProps) {
  const reducedMotion = usePrefersReducedMotion();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
      className={cn(
        'border-line bg-surface-2/70 text-ink-muted hover:border-brand/50 hover:text-brand relative grid size-10 place-items-center rounded-full border transition',
        className,
      )}
    >
      <motion.span
        key={theme}
        initial={reducedMotion ? false : { rotate: -80, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="grid place-items-center"
      >
        {isDark ? <Moon aria-hidden className="size-4" /> : <Sun aria-hidden className="size-4" />}
      </motion.span>
    </button>
  );
}
