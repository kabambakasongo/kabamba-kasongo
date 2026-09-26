/**
 * Injecte l'URL publique du site dans le HTML genere (dist/index.html).
 *
 * Le fichier source index.html ne contient aucune URL en dur : il utilise le
 * jeton `__SITE_URL__`. Ce script le remplace par l'URL reelle, ce qui evite
 * d'ecrire un nom d'utilisateur GitHub (ou un domaine) dans le code et
 * garantit que le canonical, l'Open Graph, le Twitter Card et le JSON-LD
 * pointent tous vers la meme adresse.
 *
 * Usage : node scripts/inject-seo.mjs  (execute automatiquement en postbuild)
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveSiteConfig } from './lib/site-env.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distIndex = resolve(root, 'dist/index.html');
const { absoluteBase } = resolveSiteConfig(root);

const html = readFileSync(distIndex, 'utf8');

if (!html.includes('__SITE_URL__')) {
  console.log(`[seo] dist/index.html : aucune URL a injecter (${absoluteBase})`);
} else {
  writeFileSync(distIndex, html.replaceAll('__SITE_URL__', absoluteBase), 'utf8');
  console.log(`[seo] URL publique injectee dans dist/index.html : ${absoluteBase}`);
}
