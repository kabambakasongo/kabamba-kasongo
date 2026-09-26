import { cn } from '@/utils/cn';

interface MarqueeProps {
  items: readonly string[];
  className?: string;
  /** Vitesse de defilement en secondes pour un cycle complet. */
  duration?: number;
}

/**
 * Bandeau defilant de technologies.
 * Le contenu est duplique pour un defilement continu et sans couture ;
 * l'animation est neutralisee si l'utilisateur limite les animations.
 */
export function Marquee({ items, className, duration = 38 }: MarqueeProps) {
  const sequence = [...items, ...items];

  return (
    <div className={cn('mask-fade-x relative overflow-hidden', className)}>
      <ul
        className="animate-marquee flex w-max items-center gap-8 pr-8 group-hover:[animation-play-state:paused] hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${duration}s` }}
        aria-hidden
      >
        {sequence.map((item, index) => (
          <li key={`${item}-${index}`} className="flex items-center gap-8">
            <span className="text-ink-subtle font-mono text-xs tracking-[0.18em] uppercase">
              {item}
            </span>
            <span aria-hidden className="bg-brand/60 size-1 rounded-full" />
          </li>
        ))}
      </ul>
      <span className="sr-only">Technologies : {items.join(', ')}</span>
    </div>
  );
}
