/**
 * Genere les fichiers SEO statiques (robots.txt, sitemap.xml, 404.html)
 * a partir des variables d'environnement.
 *
 * Usage : node scripts/generate-seo.mjs
 *
 * Ces fichiers sont generes dans public/ puis copies dans dist/ par Vite.
 * Les URL absolues de dist/index.html sont injectees ensuite par
 * scripts/inject-seo.mjs (postbuild), a partir de la meme configuration.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveSiteConfig } from './lib/site-env.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { siteUrl, base, absoluteBase, isPlaceholder } = resolveSiteConfig(root);

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}${base}/sitemap.xml
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}${base}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

mkdirSync(resolve(root, 'public'), { recursive: true });
writeFileSync(resolve(root, 'public/robots.txt'), robots, 'utf8');
writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap, 'utf8');
writeFileSync(
  resolve(root, 'public/404.html'),
  readFileSync(resolve(root, 'scripts/404.template.html'), 'utf8').replaceAll(
    '__BASE_URL__',
    absoluteBase,
  ),
  'utf8',
);

console.log(`[seo] robots.txt, sitemap.xml et 404.html generes pour ${absoluteBase}`);

if (isPlaceholder) {
  console.log(
    "[seo] ATTENTION : SITE_URL n'est pas definie, une URL publique de\n" +
      '      remplacement est utilisee. Renseignez SITE_URL dans .env ou\n' +
      '      comme variable du depot pour obtenir les URL canoniques, la\n' +
      '      sitemap et la page 404 definitives.',
  );
}
