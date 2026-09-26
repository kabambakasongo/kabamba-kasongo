import { hasConfiguredSiteUrl, site } from '@/config/site';

interface SeoPayload {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
}

function upsertMeta(
  selector: string,
  attribute: 'name' | 'property',
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Met a jour les balises SEO a l'execution.
 * Les balises de base sont deja presentes dans index.html (indispensable
 * pour les robots) : cette fonction sert a rester coherent si le profil change.
 *
 * Si VITE_SITE_URL n'est pas configuree, on utilise l'origine reellement
 * visitee plutot qu'une URL de remplacement, afin de ne jamais publier une
 * URL canonique fictive.
 */
export function applySeo({ title, description, path = '/', image, type = 'website' }: SeoPayload) {
  if (typeof document === 'undefined') return;

  const origin = hasConfiguredSiteUrl ? site.siteUrl : window.location.origin;
  const url = `${origin}${path === '/' ? '/' : path}`;
  const imageUrl = image ? `${origin}${image}` : `${origin}/og-image.svg`;

  document.title = title;

  upsertMeta('meta[name="description"]', 'name', 'description', description);
  upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
  upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', url);
  upsertMeta('meta[property="og:type"]', 'property', 'og:type', type);
  upsertMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl);
  upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;
}

/** Partage natif si disponible, avec repli sur le presse-papiers. */
export async function sharePortfolio(): Promise<'native' | 'clipboard' | 'failed'> {
  const shareData = {
    title: document.title,
    text: 'KABAMBA KASONGO — Développeur Full-Stack',
    url: window.location.href,
  };

  try {
    if (navigator.share && navigator.canShare?.(shareData)) {
      await navigator.share(shareData);
      return 'native';
    }
    await navigator.clipboard.writeText(window.location.href);
    return 'clipboard';
  } catch {
    try {
      await navigator.clipboard.writeText(window.location.href);
      return 'clipboard';
    } catch {
      return 'failed';
    }
  }
}

export async function copyText(value: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    // Repli pour les navigateurs anciens ou les contextes non securises.
    try {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  }
}
