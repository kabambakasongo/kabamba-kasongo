import type { ElementType, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface SectionProps {
  id: string;
  /** Numéro et libellé affichés dans l'en-tête de section. */
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  children: ReactNode;
  as?: ElementType;
  containerClassName?: string;
}

/** Conteneur de section : ancre, en-tête typé et espacement homogène. */
export function Section({
  id,
  index,
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  containerClassName,
  children,
  as: Tag = 'section',
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn('scroll-mt-24 py-20 sm:py-24 lg:py-28', className)}
      aria-labelledby={`${id}-title`}
    >
      <div className={cn('container-page', containerClassName)}>
        {(title || description) && (
          <header
            className={cn(
              'mb-12 flex flex-col gap-4 sm:mb-16',
              align === 'center' && 'items-center text-center',
            )}
          >
            {eyebrow && (
              <p className="text-brand flex items-center gap-2 font-mono text-xs tracking-[0.22em] uppercase">
                {index && <span className="text-ink-subtle">{index}</span>}
                <span aria-hidden className="bg-brand/50 h-px w-6" />
                {eyebrow}
              </p>
            )}
            <h2
              id={`${id}-title`}
              className="text-ink text-3xl font-semibold sm:text-4xl lg:text-[2.75rem]"
            >
              {title}
            </h2>
            {description && (
              <p
                className={cn(
                  'text-ink-muted max-w-2xl text-base leading-relaxed',
                  align === 'center' && 'mx-auto',
                )}
              >
                {description}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </Tag>
  );
}
