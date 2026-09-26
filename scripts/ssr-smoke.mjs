import { createServer } from 'vite';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

const errors = [];
const originalError = console.error;
console.error = (...args) => {
  errors.push(args.map(String).join(' '));
  originalError(...args);
};

try {
  const [{ default: App }, { ToastProvider }] = await Promise.all([
    vite.ssrLoadModule('/src/App.tsx'),
    vite.ssrLoadModule('/src/hooks/useToast.tsx'),
  ]);

  const html = renderToString(createElement(ToastProvider, null, createElement(App)));

  const checks = {
    'Nom complet': 'KABAMBA',
    'Role FR': 'Développeur Full-Stack',
    Localisation: 'Kolwezi',
    'Section projets': 'id="projets"',
    'Section contact': 'id="contact"',
    'Section github': 'id="github"',
    'Filtre projets': 'Tous',
    'Projet SchoolFlow': 'SchoolFlow',
    'Projet Majifuzo': 'Majifuzo',
    'Projet PEGUYWAX': 'PEGUYWAX',
    'Projet BusinessFlow': 'BusinessFlow',
    'Projet Educ-Me': 'Educ-Me',
    'Projet EnglishPro': 'EnglishPro',
    'Badge demo': 'Démo portfolio',
    'Formulaire (fallback)': 'Contactez-moi directement',
    Footer: 'Tous droits réservés',
  };

  let failed = 0;
  for (const [label, needle] of Object.entries(checks)) {
    const ok = html.includes(needle);
    if (!ok) failed += 1;
    console.log(`${ok ? 'OK  ' : 'FAIL'} ${label}`);
  }

  const realErrors = errors.filter(
    (message) =>
      !message.includes('useLayoutEffect does nothing on the server') &&
      !message.includes('useLayoutEffect'),
  );
  console.log(`\nHTML: ${html.length} caracteres`);
  console.log(`Erreurs console: ${realErrors.length}`);
  if (realErrors.length > 0) {
    console.log(realErrors.slice(0, 10).join('\n'));
  }
  if (failed > 0 || realErrors.length > 0) {
    process.exitCode = 1;
  }
} finally {
  await vite.close();
}
