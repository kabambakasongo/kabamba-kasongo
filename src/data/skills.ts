import type { SkillCategory } from '@/types';

/**
 * COMPETENCES
 * ------------------------------------------------------------------
 * `level` (1 a 5) pilote l'affichage en pastilles : ce n'est pas une
 * barre de progression. Ajustez les niveaux selon votre experience
 * reelle : ils doivent rester honnetes.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: 'layout',
    blurb: 'Interfaces modernes, accessibles et rapides sur tous les écrans.',
    skills: [
      { name: 'HTML5', level: 5 },
      { name: 'CSS3', level: 5 },
      { name: 'JavaScript', level: 5 },
      { name: 'TypeScript', level: 4 },
      { name: 'React', level: 5 },
      { name: 'Tailwind CSS', level: 5 },
      { name: 'Bootstrap', level: 5 },
      { name: 'jQuery', level: 4 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: 'server',
    blurb: 'APIs REST, modèles de données et logique métier côté serveur.',
    skills: [
      { name: 'Python', level: 5 },
      { name: 'Django', level: 5 },
      { name: 'Django REST Framework', level: 5 },
      { name: 'REST API', level: 5 },
      { name: 'Node.js', level: 3 },
    ],
  },
  {
    id: 'desktop',
    label: 'Desktop',
    icon: 'monitor',
    blurb: 'Logiciels de bureau professionnels, autonomes et optimisés.',
    skills: [
      { name: 'PyQt6', level: 5 },
      { name: 'PySide6', level: 5 },
      { name: 'Qt', level: 4 },
    ],
  },
  {
    id: 'database',
    label: 'Bases de données',
    icon: 'database',
    blurb: 'Schémas normalisés, requêtes optimisées et migrations propres.',
    skills: [
      { name: 'PostgreSQL', level: 5 },
      { name: 'MySQL', level: 4 },
      { name: 'SQLite', level: 5 },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & outils',
    icon: 'git',
    blurb: 'Versionnement, automatisation et mise en production reproductible.',
    skills: [
      { name: 'Git', level: 5 },
      { name: 'GitHub', level: 5 },
      { name: 'GitHub Actions', level: 4 },
      { name: 'Docker', level: 4 },
      { name: 'PyInstaller', level: 4 },
      { name: 'CI/CD', level: 4 },
    ],
  },
  {
    id: 'design',
    label: 'Design',
    icon: 'palette',
    blurb: 'Design d’interface : hiérarchie visuelle, ergonomie, responsive.',
    skills: [
      { name: 'UI/UX', level: 4 },
      { name: 'Responsive Design', level: 5 },
      { name: 'Figma', level: 3 },
      { name: 'Adobe Photoshop', level: 3 },
    ],
  },
];

/** Liste plate des technologies, utilisee pour le compteur de la section About. */
export const allTechnologies = skillCategories.flatMap((category) =>
  category.skills.map((skill) => skill.name),
);

/** Technologies cles affichees dans la section GitHub. */
export const coreTechnologies = [
  'TypeScript',
  'React',
  'Python',
  'Django',
  'PostgreSQL',
  'Tailwind CSS',
  'PyQt6',
  'PySide6',
  'Docker',
  'Git',
];
