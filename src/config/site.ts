/**
 * Configuration globale du site : SEO, navigation, integrations externes.
 *
 * `siteUrl` peut etre surcharge via la variable d'environnement
 * VITE_SITE_URL (voir .env.example). Les fichiers robots.txt,
 * sitemap.xml et 404.html sont generes au build a partir de SITE_URL.
 *
 * Aucune URL n'est devinee : sans VITE_SITE_URL, on utilise un domaine de
 * remplacement reserve (`.example`) et les balises SEO se rabattent sur
 * l'origine du site reellement visitee.
 */

/** Domaine reserve (RFC 2606) : jamais resolvable, donc evident placeholder. */
export const PLACEHOLDER_SITE_URL = 'https://votre-url-github-pages.example';

const envSiteUrl = import.meta.env.VITE_SITE_URL?.trim().replace(/\/+$/, '');

/** `true` si une URL publique reelle a ete fournie. */
export const hasConfiguredSiteUrl = (envSiteUrl?.length ?? 0) > 0;

export const site = {
  siteUrl: envSiteUrl || PLACEHOLDER_SITE_URL,
  locale: 'fr_FR',
  language: 'fr',
  themeColorDark: '#0A0B0D',
  themeColorLight: '#F6F6F3',
} as const;

export const seo = {
  title: 'KABAMBA KASONGO | Full-Stack Developer',
  description:
    'Portfolio de KABAMBA KASONGO, développeur Full-Stack spécialisé dans la création d’applications web, plateformes SaaS et solutions digitales modernes.',
  keywords: [
    'KABAMBA KASONGO',
    'développeur Full-Stack',
    'React',
    'TypeScript',
    'Django',
    'Python',
    'plateforme SaaS',
    'application web',
    'développeur web RDC',
    'Kolwezi',
    'portfolio développeur',
  ],
} as const;

/** Navigation principale (utilisee par la navbar et le menu mobile). */
export const navigation = [
  { id: 'apropos', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'projets', label: 'Projets' },
  { id: 'services', label: 'Services' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'process', label: 'Process' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
] as const;

/**
 * Provider du formulaire de contact.
 * - `none`    : aucun formulaire, un e-mail / lien direct est propose.
 * - `web3forms` : Web3Forms (access_key public)
 * - `formspree` : Formspree (endpoint / form-id)
 * - `emailjs`   : EmailJS (identifiants de service)
 *
 * Voir README.md > Formulaire de contact.
 */
export const contactForm = {
  provider: (import.meta.env.VITE_CONTACT_PROVIDER?.trim() || 'none') as
    'none' | 'web3forms' | 'formspree' | 'emailjs',
  web3formsAccessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim() ?? '',
  formspreeEndpoint: import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() ?? '',
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? '',
  },
  /** Adresse de destination affichee dans le message de succes. */
  successMessage: 'Merci ! Votre message a bien été envoyé, je vous réponds sous 48 h.',
  errorMessage: "L'envoi a échoué. Vous pouvez m'écrire directement par e-mail ou WhatsApp.",
} as const;

export const isContactFormConfigured = (() => {
  switch (contactForm.provider) {
    case 'web3forms':
      return contactForm.web3formsAccessKey.length > 0;
    case 'formspree':
      return contactForm.formspreeEndpoint.startsWith('https://');
    case 'emailjs':
      return (
        contactForm.emailjs.serviceId.length > 0 &&
        contactForm.emailjs.templateId.length > 0 &&
        contactForm.emailjs.publicKey.length > 0
      );
    default:
      return false;
  }
})();
