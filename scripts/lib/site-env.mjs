/**
 * Resolution de la configuration de deploiement, partagee par les scripts
 * de build (SEO statique + injection dans dist/index.html).
 *
 * Variables lues (par ordre de priorite) :
 *   - process.env (CI)
 *   - le fichier .env du projet
 *
 *   SITE_URL         URL publique du site, sans slash final
 *   VITE_BASE_PATH   Chemin de base du deploiement ('./' par defaut)
 *
 * Regle : aucune URL n'est devinee. Si SITE_URL n'est pas renseignee,
 * on utilise un domaine de remplacement reserve (`.example`, RFC 2606)
 * qui ne peut pas correspondre a un site reel, et un avertissement est
 * affiche. En production, le workflow GitHub Pages renseigne SITE_URL
 * automatiquement a partir du nom du depot.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** Domaine reserve (RFC 2606) : jamais resolvable, donc evident placeholder. */
export const PLACEHOLDER_SITE_URL = 'https://votre-url-github-pages.example';

/** Lecture simple d'un fichier .env, sans dependance externe. */
function readEnvFile(root) {
  try {
    return Object.fromEntries(
      readFileSync(resolve(root, '.env'), 'utf8')
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith('#') && line.includes('='))
        .map((line) => {
          const index = line.indexOf('=');
          const key = line.slice(0, index).trim();
          const value = line
            .slice(index + 1)
            .trim()
            .replace(/^["']|["']$/g, '');
          return [key, value];
        }),
    );
  } catch {
    return {};
  }
}

export function resolveSiteConfig(root) {
  const env = readEnvFile(root);
  const rawSiteUrl = (env.SITE_URL || process.env.SITE_URL || '').trim();
  const isPlaceholder = rawSiteUrl.length === 0;

  const siteUrl = (isPlaceholder ? PLACEHOLDER_SITE_URL : rawSiteUrl).replace(/\/+$/, '');
  const basePath = (env.VITE_BASE_PATH || process.env.VITE_BASE_PATH || './').replace(/\/+$/, '');

  // Un base path relatif ("./") ne peut pas etre utilise dans une sitemap :
  // on retombe alors sur la racine du domaine.
  const base = basePath === '' || basePath === '.' || basePath === './' ? '' : basePath;

  // URL absolue du site, toujours terminee par "/" : utilisee dans la page 404
  // et les meta tags afin que les liens fonctionnent quelle que soit la
  // profondeur de l'URL demandee.
  const absoluteBase = `${siteUrl}${base}/`;

  return { siteUrl, basePath, base, absoluteBase, isPlaceholder };
}
