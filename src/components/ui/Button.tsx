import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-brand-contrast shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/35 hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-surface-2 text-ink border border-line hover:border-line-strong hover:-translate-y-0.5 active:translate-y-0',
  outline:
    'border border-line-strong text-ink hover:border-brand/60 hover:text-brand hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'text-ink-muted hover:text-ink hover:bg-surface-2',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkButtonProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * Lien bouton : gere automatiquement les liens externes
 * (target, rel, icone) et le telechargement des fichiers.
 */
export const ButtonLink = forwardRef<HTMLAnchorElement, LinkButtonProps>(function ButtonLink(
  { variant = 'primary', size = 'md', iconStart, iconEnd, className, children, href, ...props },
  ref,
) {
  const isExternal = /^https?:\/\//i.test(href);
  const isFile = /\.(pdf|zip|docx?|xlsx?|png|jpe?g|webp)$/i.test(href);

  return (
    <a
      ref={ref}
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      {...(isFile ? { download: true } : {})}
      {...props}
    >
      {iconStart}
      <span>{children}</span>
      {iconEnd}
    </a>
  );
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', iconStart, iconEnd, className, children, ...props },
  ref,
) {
  return (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {iconStart}
      <span>{children}</span>
      {iconEnd}
    </button>
  );
});
