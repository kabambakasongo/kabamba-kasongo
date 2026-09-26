import type { Service } from '@/types';

/** SERVICES proposes. */
export const services: Service[] = [
  {
    id: 'web',
    title: 'Développement Web',
    description:
      "Création de sites et d'applications web modernes, rapides et adaptés à votre activité.",
    deliverables: ['Sites vitrines', 'Applications web', 'Portails', 'Refonte UX'],
    icon: 'globe',
  },
  {
    id: 'saas',
    title: 'Applications SaaS',
    description:
      'Développement de plateformes SaaS scalables, avec authentification, facturation et espaces utilisateurs.',
    deliverables: [
      'Architecture multi-tenant',
      'Abonnements',
      'Espaces utilisateurs',
      'Tableaux de bord',
    ],
    icon: 'layers',
  },
  {
    id: 'desktop',
    title: 'Applications Desktop',
    description:
      'Création de logiciels professionnels avec PyQt6 et PySide6, fonctionnant sans connexion internet.',
    deliverables: ['Applications Qt', 'Logiciels hors ligne', 'Export PDF/Excel', 'Base SQLite'],
    icon: 'appWindow',
  },
  {
    id: 'backend',
    title: 'Développement Backend',
    description:
      'APIs REST, bases de données et architectures backend solides avec Python et Django.',
    deliverables: ['APIs REST', 'Modélisation', 'Authentification', 'Tâches asynchrones'],
    icon: 'server',
  },
  {
    id: 'design',
    title: 'UI/UX',
    description:
      'Conception d’interfaces modernes, intuitives et responsive, pensées pour vos utilisateurs.',
    deliverables: ['Wireframes', 'Maquettes', 'Design systems', 'Prototypage'],
    icon: 'penTool',
  },
  {
    id: 'custom',
    title: 'Solutions personnalisées',
    description:
      'Développement de logiciels sur mesure, adaptés aux processus spécifiques de votre entreprise.',
    deliverables: ['Audit du besoin', 'Spécifications', 'Développement', 'Maintenance'],
    icon: 'blocks',
  },
];
