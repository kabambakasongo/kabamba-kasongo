/**
 * FICHIER DE CONFIGURATION PRINCIPAL
 * ------------------------------------------------------------------
 * Modifiez ce fichier pour mettre a jour l'ensemble des informations
 * personnelles du portfolio (coordonnees, textes, disponibilidad).
 *
 * Regle importante : ne renseignez que des informations reelles.
 * Les champs laisses vides sont automatiquement masques dans
 * l'interface (aucun lien mort, aucun contenu factice).
 *
 * L'identifiant GitHub peut etre fourni de deux facons :
 *   1. ce fichier, champ `github` ;
 *   2. la variable d'environnement VITE_GITHUB_USERNAME (voir .env.example),
 *      pratique pour ne pas toucher au code lors d'un deploiement.
 * La variable d'environnement est prioritaire.
 */

/** Identifiant GitHub fourni par l'environnement, s'il existe. */
const envGithubUsername = import.meta.env.VITE_GITHUB_USERNAME?.trim() ?? '';

export const profile = {
  /* -------------------------- Identite -------------------------- */
  name: 'KABAMBA KASONGO',
  firstName: 'KABAMBA',
  lastName: 'KASONGO',
  initials: 'KK',
  role: 'Full-Stack Developer',
  roleFr: 'Développeur Full-Stack',
  specialty: 'Développement Web & Applications métier',
  availability: 'Disponible pour de nouvelles missions',

  /* ------------------------ Localisation ------------------------ */
  location: 'Kolwezi, République Démocratique du Congo',
  locationShort: 'Kolwezi, RDC',
  countryCode: '🇨🇩',
  country: 'CD',

  /* ------------------------- Coordonnees ------------------------ */
  /**
   * Identifiant GitHub, sans le "@".
   * Laissez vide si vous n'avez pas de compte : le bloc GitHub affiche alors
   * un message de configuration en attente, sans lien mort.
   * Overridable via VITE_GITHUB_USERNAME.
   */
  github: envGithubUsername || 'kabambakasongo',
  /** URL complete de votre profil LinkedIn. */
  linkedin: 'https://linkedin.com/in/ledoux-kabamba-7b773a319',
  /** Adresse e-mail publique. */
  email: 'ledouxkabamba135@gmail.com',
  /** Numero WhatsApp au format international, chiffres uniquement. */
  whatsapp: '+243977143354',

  /* --------------------------- Contenu -------------------------- */
  heroIntro:
    'Je conçois et développe des applications web modernes, des plateformes SaaS et des solutions digitales performantes adaptées aux besoins des entreprises.',
  about: [
    'Je suis KABAMBA KASONGO, développeur Full-Stack basé à Kolwezi en République Démocratique du Congo. Je conçois et développe des applications web, des plateformes SaaS et des logiciels de gestion destinés à répondre à des besoins réels.',
    "J'aime transformer des idées et des besoins métiers en solutions digitales modernes, performantes et faciles à utiliser.",
    "Mon travail couvre toute la chaîne de développement : conception de l'architecture, développement frontend et backend, bases de données, automatisation et mise en production.",
  ],
  philosophy:
    "Des interfaces sobres, une architecture solide, et un code que n'importe quel autre développeur peut maintenir.",

  /**
   * Nombre d'annees d'experience. Laissez `null` tant que la valeur
   * n'est pas renseignee : la carte correspondante est masquee.
   * Exemple : yearsOfExperience: 3
   */
  yearsOfExperience: null as number | null,

  /**
   * Chemin du CV (PDF) place dans le dossier `public/`.
   * Exemple : cvUrl: './cv/cv-kabamba-kasongo.pdf'
   * Laissez vide pour desactiver le bouton « Télécharger mon CV ».
   */
  cvUrl: '',

  /**
   * Photo professionnelle placee dans le dossier `public/`.
   * Recommande : portrait.jpg ou portrait.webp, format carre, 800x800 minimum.
   * Source : images/profil.png (1254x1254), optimisee en public/portrait.jpg.
   */
  photo: './portrait.jpg',
} as const;

/* ------------------------------------------------------------------ *
 *  Helpers — ne pas modifier
 * ------------------------------------------------------------------ */

export const githubUsername = profile.github.trim().replace(/^@/, '');

export const hasGithub = githubUsername.length > 0;
export const hasLinkedin = profile.linkedin.trim().length > 0;
export const hasEmail = profile.email.trim().length > 0;
export const hasWhatsapp = profile.whatsapp.replace(/\D/g, '').length > 0;
export const hasCv = profile.cvUrl.trim().length > 0;

export const githubUrl = hasGithub ? `https://github.com/${githubUsername}` : '';
export const linkedinUrl = profile.linkedin.trim();
export const mailtoUrl = hasEmail ? `mailto:${profile.email.trim()}` : '';
export const whatsappUrl = hasWhatsapp
  ? `https://wa.me/${profile.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
      "Bonjour KABAMBA KASONGO, j'ai vu votre portfolio et je souhaite discuter d'un projet.",
    )}`
  : '';

/** Reperes cles du parcours, presents dans la section « À propos ». */
export const highlights = [
  {
    id: 'web',
    label: 'Web',
    value: 'Applications web & SaaS',
    detail: 'React, TypeScript, Django, REST API',
  },
  {
    id: 'desktop',
    label: 'Desktop',
    value: 'Logiciels professionnels',
    detail: 'PyQt6, PySide6, SQLite, PostgreSQL',
  },
  {
    id: 'domain',
    label: 'Secteur',
    value: 'Gestion & éducation',
    detail: 'Scolaire, finance, commerce, formation',
  },
];
