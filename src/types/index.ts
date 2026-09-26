/**
 * Types partages du portfolio.
 * Les donnees editables se trouvent dans `src/data` et `src/config`.
 */

/** Categories utilisees pour le filtrage de la section Projets. */
export type ProjectCategory = 'Web' | 'SaaS' | 'Desktop' | 'Éducation' | 'Business';

/**
 * Origine d'un projet. `portfolio-demo` affiche automatiquement un badge
 * « Démo portfolio » pour rester transparent sur la nature du projet.
 */
export type ProjectDisclosure = 'portfolio-demo' | 'personal' | 'client';

/** Palette du visuel genere pour chaque projet (aucune image externe requise). */
export type ProjectAccent = 'ember' | 'gold' | 'teal' | 'indigo' | 'rose' | 'lime';

export interface ProjectFeature {
  label: string;
  detail?: string;
}

export interface Project {
  slug: string;
  name: string;
  /** Accroche courte affichee sur la carte. */
  tagline: string;
  /** Description complete affichee dans la fenetre de detail. */
  description: string;
  categories: ProjectCategory[];
  technologies: string[];
  features: string[];
  /** Annee de realisation, si connue. */
  year: string;
  disclosure: ProjectDisclosure;
  accent: ProjectAccent;
  /** Points forts chiffres (optionnel). */
  highlights?: { value: string; label: string }[];
  github: string;
  demo: string;
  featured: boolean;
}

export interface Skill {
  name: string;
  /** Niveau visuel de 1 a 5 (pastilles), pas de barre de progression. */
  level: 1 | 2 | 3 | 4 | 5;
  note?: string;
}

export type SkillIcon = 'layout' | 'server' | 'monitor' | 'database' | 'git' | 'palette';

export interface SkillCategory {
  id: string;
  label: string;
  icon: SkillIcon;
  blurb: string;
  skills: Skill[];
}

export type ServiceIcon = 'globe' | 'layers' | 'appWindow' | 'server' | 'penTool' | 'blocks';

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: ServiceIcon;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  /** Entreprise ou contexte (laisser vide si non renseigne). */
  company: string;
  period: string;
  description: string;
  highlights: string[];
  stack: string[];
}

export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
  details: string[];
}

export interface NavItem {
  id: string;
  label: string;
}

export interface StatItem {
  id: string;
  label: string;
  value: string | null;
  hint: string;
}
