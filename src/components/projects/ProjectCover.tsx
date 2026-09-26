import { cn } from '@/utils/cn';
import type { ProjectAccent } from '@/types';

const ACCENTS: Record<ProjectAccent, { from: string; to: string; glow: string; text: string }> = {
  ember: { from: '#ff7a45', to: '#ffb020', glow: 'rgba(255,122,69,0.45)', text: '#2a1006' },
  gold: { from: '#f0a92e', to: '#f7d070', glow: 'rgba(240,169,46,0.45)', text: '#2b1c02' },
  teal: { from: '#14b8a6', to: '#5eead4', glow: 'rgba(20,184,166,0.45)', text: '#03211d' },
  indigo: { from: '#6366f1', to: '#a5b4fc', glow: 'rgba(99,102,241,0.45)', text: '#0d0c2b' },
  rose: { from: '#f43f5e', to: '#fda4af', glow: 'rgba(244,63,94,0.45)', text: '#2c0710' },
  lime: { from: '#84cc16', to: '#bef264', glow: 'rgba(132,204,22,0.45)', text: '#131f05' },
};

interface ProjectCoverProps {
  name: string;
  accent: ProjectAccent;
  className?: string;
  label: string;
}

/**
 * Visuel genere en CSS pour chaque projet : aucun fichier image,
 * un rendu net a toutes les densites d'ecran et un theme unique
 * par projet (aucune image generique repetee).
 */
export function ProjectCover({ name, accent, className, label }: ProjectCoverProps) {
  const palette = ACCENTS[accent];
  const letters = name
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div
      role="img"
      aria-label={label}
      className={cn('relative isolate aspect-16/10 overflow-hidden rounded-t-[1.25rem]', className)}
      style={{ backgroundColor: palette.glow }}
    >
      {/* degrade principal */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(135deg, ${palette.from} 0%, ${palette.to} 100%)`,
        }}
      />

      {/* trame de points */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(0,0,0,0.55) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />

      {/* arcs concentriques */}
      <svg
        aria-hidden
        viewBox="0 0 400 250"
        className="absolute -right-10 -bottom-16 h-[150%] w-[70%] opacity-40"
        fill="none"
        stroke={palette.text}
        strokeWidth="1"
      >
        <circle cx="200" cy="125" r="40" />
        <circle cx="200" cy="125" r="70" />
        <circle cx="200" cy="125" r="100" />
        <circle cx="200" cy="125" r="130" />
      </svg>

      {/* initiales fantomes */}
      <span
        aria-hidden
        className="font-display absolute -top-6 -left-2 text-[7rem] leading-none font-bold opacity-25 select-none sm:text-[9rem]"
        style={{ color: palette.text }}
      >
        {letters}
      </span>

      {/* ligne de base */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          backgroundImage: `linear-gradient(to top, ${palette.text}22, transparent)`,
        }}
      />
    </div>
  );
}
