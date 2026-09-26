/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Chemin de base du deploiement (ex: `/` ou `./`). */
  readonly VITE_BASE_PATH?: string;
  /** URL publique du site, utilisee par robots.txt et sitemap.xml. */
  readonly VITE_SITE_URL?: string;
  /** Identifiant GitHub, prioritaire sur le champ `github` du profil. */
  readonly VITE_GITHUB_USERNAME?: string;
  /** Provider du formulaire de contact : none | web3forms | formspree | emailjs */
  readonly VITE_CONTACT_PROVIDER?: string;
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
  readonly VITE_FORMSPREE_ENDPOINT?: string;
  readonly VITE_EMAILJS_SERVICE_ID?: string;
  readonly VITE_EMAILJS_TEMPLATE_ID?: string;
  readonly VITE_EMAILJS_PUBLIC_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
