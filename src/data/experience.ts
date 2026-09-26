import type { ExperienceEntry } from '@/types';

/**
 * PARCOURS
 * ------------------------------------------------------------------
 * Ces entrees decrivent des domaines de competence. Pour ajouter une
 * experience professionnelle reelle, renseignez `company` et `period` :
 * ces informations s'afficheront automatiquement sur la frise.
 * Laissez les champs vides plutot que d'inventer des informations.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'fullstack',
    role: 'Développeur Full-Stack',
    company: '',
    period: '',
    description:
      "Développement d'applications web, de plateformes SaaS et de logiciels de gestion, de la conception de l'architecture jusqu'à la mise en production.",
    highlights: [
      'Conception d’interfaces responsive et accessibles',
      'Développement frontend et backend',
      'Modélisation des bases de données',
      'Déploiement et maintenance',
    ],
    stack: ['React', 'TypeScript', 'Django', 'PostgreSQL', 'REST API'],
  },
  {
    id: 'backend',
    role: 'Développement Python / Django',
    company: '',
    period: '',
    description:
      'Conception d’applications backend et d’APIs REST robustes, sécurisées et documentées.',
    highlights: [
      'APIs REST avec Django REST Framework',
      'Authentification et gestion des rôles',
      'Optimisation des requêtes SQL',
      'Automatisation et rapports',
    ],
    stack: ['Python', 'Django', 'DRF', 'PostgreSQL', 'SQLite'],
  },
  {
    id: 'desktop',
    role: 'Développement Desktop',
    company: '',
    period: '',
    description:
      'Création d’applications de bureau professionnelles avec PyQt6 et PySide6, packagées et prêtes à l’emploi.',
    highlights: [
      'Interfaces Qt natives et fluides',
      'Bases de données locales',
      'Génération de rapports et reçus',
      'Packaging avec PyInstaller',
    ],
    stack: ['PyQt6', 'PySide6', 'Python', 'SQLite', 'Qt'],
  },
  {
    id: 'devops',
    role: 'Intégration & DevOps',
    company: '',
    period: '',
    description:
      'Automatisation des cycles de développement, conteneurisation et déploiement continu.',
    highlights: [
      'Pipelines GitHub Actions',
      'Conteneurisation avec Docker',
      'Scripts d’automatisation',
      'Documentation technique',
    ],
    stack: ['Git', 'GitHub Actions', 'Docker', 'CI/CD', 'PyInstaller'],
  },
];
