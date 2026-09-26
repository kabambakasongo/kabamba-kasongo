import { allTechnologies } from '@/data/skills';
import { projects } from '@/data/projects';
import { profile } from '@/config/profile';
import type { StatItem } from '@/types';

/**
 * Statistiques de la section « À propos ».
 * Les valeurs derives sont calculees automatiquement a partir des
 * fichiers de donnees. Les valeurs reelles (annees d'experience)
 * proviennent de `src/config/profile.ts` et sont masquees si vides.
 */
export const stats: StatItem[] = [
  {
    id: 'projects',
    label: 'Projets réalisés',
    value: String(projects.length).padStart(2, '0'),
    hint: 'applications web, SaaS et desktop',
  },
  {
    id: 'tech',
    label: 'Technologies maîtrisées',
    value: String(allTechnologies.length).padStart(2, '0'),
    hint: 'frontend, backend, desktop et outils',
  },
  {
    id: 'solutions',
    label: 'Solutions développées',
    value: String(projects.length).padStart(2, '0'),
    hint: 'domaines scolaire, commerce et éducation',
  },
  {
    id: 'experience',
    label: "Années d'expérience",
    value: profile.yearsOfExperience ? String(profile.yearsOfExperience) : null,
    hint: 'renseigné dans src/config/profile.ts',
  },
];

/** Filtre `Tous` en tete de la liste des filtres de projets. */
export const allCategoryLabel = 'Tous';
