import type { Project, ProjectCategory } from '@/types';

/**
 * PROJETS
 * ------------------------------------------------------------------
 * Pour ajouter un projet : ajoutez simplement un objet dans ce tableau.
 * Les filtres de la section "Projets" se construisent automatiquement
 * a partir des categories utilisees.
 *
 * `disclosure: 'portfolio-demo'` affiche un badge transparent
 * « Démo portfolio » sur la carte.
 */
export const projects: Project[] = [
  {
    slug: 'schoolflow',
    name: 'SchoolFlow',
    tagline: 'Plateforme SaaS de gestion de complexes scolaires',
    description:
      "SchoolFlow centralise la gestion complète d'un établissement scolaire : élèves, enseignants, classes, cours, frais de scolarité, encaissements, dépenses, reçus et rapports. L'architecture sépare une API Django/PostgreSQL d'un frontend responsive, afin de pouvoir faire évoluer le produit sans refonte.",
    categories: ['SaaS', 'Web', 'Éducation'],
    technologies: ['Python', 'Django', 'PostgreSQL', 'Bootstrap', 'JavaScript'],
    features: [
      'Gestion des élèves et des inscriptions',
      'Gestion des enseignants et des classes',
      'Planification des cours',
      'Frais scolaires et échéances',
      'Encaissements et édition de reçus',
      'Suivi des dépenses',
      'Rapports financiers et scolaires',
      'Tableau de bord temps réel',
      'Gestion des utilisateurs et des rôles',
    ],
    year: '',
    disclosure: 'portfolio-demo',
    accent: 'ember',
    highlights: [
      { value: '9', label: 'modules métier' },
      { value: 'API', label: 'Django REST' },
    ],
    github: '',
    demo: '',
    featured: true,
  },
  {
    slug: 'majifuzo',
    name: 'Majifuzo',
    tagline: 'Application desktop de gestion scolaire',
    description:
      "Majifuzo est une application de bureau destinée aux établissements qui ont besoin d'un outil local, rapide et totalement hors ligne. Elle centralise les opérations administratives et financières : dossiers des élèves, affectation des enseignants, suivi des cours, encaissements et rapports imprimables.",
    categories: ['Desktop', 'Éducation'],
    technologies: ['Python', 'PySide6', 'SQLite', 'PostgreSQL', 'Qt'],
    features: [
      'Dossiers élèves et parents',
      'Gestion des enseignants',
      'Classes et affectations',
      'Suivi des cours et des absences',
      'Enregistrements des paiements',
      'Filtres et recherche avancés',
      'Rapports exportables',
      'Tableau de bord synthétique',
    ],
    year: '',
    disclosure: 'portfolio-demo',
    accent: 'teal',
    highlights: [
      { value: '100%', label: 'hors ligne' },
      { value: 'Qt', label: 'interface native' },
    ],
    github: '',
    demo: '',
    featured: true,
  },
  {
    slug: 'peguywax-management',
    name: 'PEGUYWAX Management',
    tagline: 'Logiciel de gestion d’atelier de couture',
    description:
      "PEGUYWAX Management suit l'intégralité d'un atelier de couture : catalogue de produits, modèles et patrons, stocks de tissus, commandes clients, mesures et suivi de production. L'interface Qt est pensée pour rester fluide même avec plusieurs milliers de références.",
    categories: ['Desktop', 'Business'],
    technologies: ['Python', 'PyQt6', 'SQLite', 'Qt'],
    features: [
      'Gestion des produits et modèles',
      'Suivi des stocks et des réassorts',
      'Gestion des commandes clients',
      'Fiches de mesure',
      'Suivi de production et de livraison',
      'Recherche avancée par filtres',
      'Rapports et exports',
    ],
    year: '',
    disclosure: 'portfolio-demo',
    accent: 'rose',
    highlights: [
      { value: 'Qt', label: 'desktop natif' },
      { value: '7', label: 'modules' },
    ],
    github: '',
    demo: '',
    featured: false,
  },
  {
    slug: 'businessflow',
    name: 'BusinessFlow',
    tagline: 'Solution de gestion d’activités commerciales',
    description:
      'BusinessFlow accompagne une entreprise commerciale dans le suivi de ses opérations : clients, produits, ventes, stocks, dépenses et performances. Le frontend React/TypeScript consomme une API REST Django, avec des tableaux de bord analytiques mis à jour dynamiquement.',
    categories: ['SaaS', 'Web', 'Business'],
    technologies: ['React', 'TypeScript', 'Django', 'PostgreSQL', 'REST API'],
    features: [
      'Dashboard analytique',
      'Gestion des clients',
      'Catalogue produits',
      'Enregistrement des ventes',
      'Gestion du stock',
      'Suivi des dépenses',
      'Statistiques et indicateurs',
      'Rapports téléchargeables',
    ],
    year: '',
    disclosure: 'portfolio-demo',
    accent: 'indigo',
    highlights: [
      { value: 'React', label: 'frontend' },
      { value: 'REST', label: 'API Django' },
    ],
    github: '',
    demo: '',
    featured: true,
  },
  {
    slug: 'educ-me',
    name: 'Educ-Me',
    tagline: 'Plateforme éducative numérique',
    description:
      "Educ-Me facilite l'accès aux ressources et contenus éducatifs : ouvrages, cours, catégories et recherche, le tout dans un espace utilisateur personnel. L'interface reste volontairement légère pour rester utilisable sur des connexions lentes.",
    categories: ['Web', 'Éducation'],
    technologies: ['Django', 'Python', 'JavaScript', 'Bootstrap', 'PostgreSQL'],
    features: [
      'Bibliothèque de ressources éducatives',
      'Catalogue d’ouvrages et documents',
      'Catégories et sous-catégories',
      'Recherche instantanée',
      'Espace utilisateur personnel',
      'Administration des contenus',
    ],
    year: '',
    disclosure: 'portfolio-demo',
    accent: 'gold',
    highlights: [
      { value: 'Search', label: 'recherche instantanée' },
      { value: '6', label: 'entités métier' },
    ],
    github: '',
    demo: '',
    featured: false,
  },
  {
    slug: 'englishpro',
    name: 'EnglishPro',
    tagline: 'Plateforme de formation professionnelle en anglais',
    description:
      "EnglishPro structure un parcours de formation en anglais : cours, modules, évaluations, suivi de progression et délivrance de certificats. L'espace apprenant est accompagné d'un module de paiement pour la commercialisation des parcours.",
    categories: ['Web', 'Éducation', 'SaaS'],
    technologies: ['Django', 'Python', 'JavaScript', 'Bootstrap', 'PostgreSQL'],
    features: [
      'Cours et modules progressifs',
      'Évaluations et questionnaires',
      'Suivi de progression apprenant',
      'Délivrance de certificats',
      'Espace apprenant personnalisé',
      'Module de paiement',
    ],
    year: '',
    disclosure: 'portfolio-demo',
    accent: 'lime',
    highlights: [
      { value: 'Parcours', label: 'modulaire' },
      { value: 'Certificats', label: 'automatiques' },
    ],
    github: '',
    demo: '',
    featured: false,
  },
];

/** Ordre d'affichage des filtres de la section Projets. */
export const projectCategories: ProjectCategory[] = [
  'Web',
  'SaaS',
  'Desktop',
  'Éducation',
  'Business',
];

export const featuredProjects = projects.filter((project) => project.featured);

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);
