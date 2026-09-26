import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Variante d'animation : depuis le bas ou depuis la gauche. */
  from?: 'bottom' | 'left' | 'right' | 'none';
  once?: boolean;
  as?: 'div' | 'li' | 'ul' | 'article' | 'section' | 'span';
}

const OFFSETS = {
  bottom: { x: 0, y: 24 },
  left: { x: -28, y: 0 },
  right: { x: 28, y: 0 },
  none: { x: 0, y: 0 },
} as const;

/**
 * Apparition progressive au defilement.
 * Totalement desactivee si l'utilisateur demande moins d'animations.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y,
  from = 'bottom',
  once = true,
  as = 'div',
}: RevealProps) {
  const reducedMotion = usePrefersReducedMotion();
  const Component = motion[as];
  const offset = OFFSETS[from];

  const variants: Variants = reducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, x: offset.x, y: y ?? offset.y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        },
      };

  return (
    <Component
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
    >
      {children}
    </Component>
  );
}
