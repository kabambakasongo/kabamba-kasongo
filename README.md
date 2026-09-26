# KABAMBA KASONGO — Portfolio Full-Stack

Portfolio personnel de **KABAMBA KASONGO**, développeur Full-Stack basé à
**Kolwezi, République Démocratique du Congo**.

Application 100 % statique (React + TypeScript + Vite + Tailwind CSS),
conçue pour être hébergée sur **GitHub Pages** : aucun backend, aucune base de
données, aucune clé secrète.

- Mode sombre par défaut, mode clair disponible
- Navigation active selon la section, animations au défilement
- Contenu entièrement piloté par des fichiers de données
- SEO complet (métadonnées, Open Graph, Schema.org, `robots.txt`, `sitemap.xml`)
- Accessible (navigation clavier, `aria-*`, contrastes conformes WCAG AA)

---

## 1. Démarrage rapide

```bash
npm install     # installation des dépendances
npm run dev     # http://localhost:5173
```

Commandes disponibles :

| Commande            | Description                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------ |
| `npm run dev`       | Serveur de développement avec rechargement à chaud                                         |
| `npm run build`     | Génère les fichiers SEO, compile vers `dist/` puis injecte l'URL publique                  |
| `npm run preview`   | Prévisualise le build de production en local                                               |
| `npm run typecheck` | Vérification TypeScript stricte                                                            |
| `npm run lint`      | Analyse ESLint                                                                             |
| `npm run format`    | Formatage Prettier                                                                         |
| `npm run smoke`     | Rendu serveur de toutes les sections + contrôle de contenu                                 |
| `npm run verify`    | Contrôle du build dans un vrai navigateur (rendu, responsive, accessibilité, interactions) |

---

## 2. Configuration

### 2.1 Informations personnelles

Tout ce qui vous concerne est centralisé dans **`src/config/profile.ts`** :

```ts
export const profile = {
  name: 'KABAMBA KASONGO',
  role: 'Full-Stack Developer',
  location: 'Kolwezi, République Démocratique du Congo',

  github: '',     // votre identifiant GitHub (surchargeable par VITE_GITHUB_USERNAME)
  linkedin: '',   // URL complète de votre profil LinkedIn
  email: '',      // adresse e-mail publique
  whatsapp: '',   // numéro au format international, chiffres uniquement
  ...
};
```

**Aucune coordonnée n'est inventée.** Les champs laissés vides sont
automatiquement masqués dans l'interface : aucun lien mort, aucun contenu
factice. Renseignez uniquement des informations réelles.

Champs utiles :

| Champ               | Effet                                                                      |
| ------------------- | -------------------------------------------------------------------------- |
| `github`            | Active la section GitHub et récupère les statistiques publiques (API)      |
| `email`             | Active le bouton « Me contacter », la copie d'e-mail et le lien `mailto:`  |
| `whatsapp`          | Active le lien WhatsApp (message pré-rempli)                               |
| `linkedin`          | Affiche l'icône LinkedIn                                                   |
| `cvUrl`             | Affiche le bouton « Télécharger mon CV » (PDF dans `public/`)              |
| `photo`             | Image de la Hero (fichier dans `public/`)                                  |
| `yearsOfExperience` | Affiche la 4ᵉ statistique ; la carte reste masquée si la valeur est `null` |
| `availability`      | Texte du badge de disponibilité en haut de la page                         |

### 2.2 Variables d'environnement

Copiez `.env.example` vers `.env` et renseignez ce qui est nécessaire.
**Toutes les variables sont optionnelles.**

```bash
cp .env.example .env
```

| Variable                | Rôle                                                               |
| ----------------------- | ------------------------------------------------------------------ |
| `SITE_URL`              | URL publique du site : robots.txt, sitemap.xml, 404 et balises SEO |
| `VITE_SITE_URL`         | Même URL, lue par l'application (balises SEO à l'exécution)        |
| `VITE_BASE_PATH`        | `./` (défaut, portable) ou `/` pour un domaine custom              |
| `VITE_GITHUB_USERNAME`  | Identifiant GitHub, prioritaire sur le champ `github` du profil    |
| `VITE_CONTACT_PROVIDER` | `none` (défaut), `web3forms`, `formspree` ou `emailjs`             |

Ces mêmes variables peuvent être définies comme **variables d'environnement
(ou « Repository variables ») dans GitHub** pour piloter le déploiement
sans toucher au code.

> **Aucune URL n'est devinée par le projet.** `index.html` ne contient aucun
> domaine en dur : il utilise le jeton `__SITE_URL__`, remplacé au build par
> `scripts/inject-seo.mjs` à partir de `SITE_URL` (canonical, Open Graph,
> Twitter Card et JSON-LD tous alignés). Si `SITE_URL` est absent, le
> build utilise le domaine réservé `votre-url-github-pages.example` et
> affiche un avertissement ; l'application utilise alors l'adresse réellement
> visitée. Le workflow GitHub Pages renseigne `SITE_URL` automatiquement.

---

## 3. Formulaire de contact

GitHub Pages n'offre aucun backend : l'envoi passe par un service externe
compatible statique. **L'intégration est optionnelle** — sans configuration,
le portfolio affiche automatiquement les canaux directs (e-mail, WhatsApp).

### Web3Forms (recommandé)

1. Créez une clé publique sur [web3forms.com](https://web3forms.com).
2. Dans `.env` :

```bash
VITE_CONTACT_PROVIDER=web3forms
VITE_WEB3FORMS_ACCESS_KEY=votre_cle_publique
```

### Formspree

```bash
VITE_CONTACT_PROVIDER=formspree
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/votre_id
```

### EmailJS

```bash
VITE_CONTACT_PROVIDER=emailjs
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=cle_publique
```

Toutes ces clés sont **publiques par conception** : aucun secret n'est stocké
dans le dépôt, le script EmailJS étant chargé à la demande.

---

## 4. Contenu : projets, compétences, services

### Ajouter un projet

Ajoutez un objet dans **`src/data/projects.ts`** :

```ts
{
  slug: 'mon-projet',
  name: 'Mon Projet',
  tagline: 'Phrase courte affichée sur la carte',
  description: 'Description complète affichée dans la fenêtre de détail.',
  categories: ['SaaS', 'Web'],
  technologies: ['React', 'Django'],
  features: ['Fonctionnalité 1', 'Fonctionnalité 2'],
  year: '2026',
  disclosure: 'portfolio-demo',   // 'portfolio-demo' | 'personal' | 'client'
  accent: 'ember',                // ember | gold | teal | indigo | rose | lime
  github: '',
  demo: '',
  featured: true,
}
```

Les filtres de la section **Projets** se recalculent automatiquement à partir
des catégories utilisées.

> `disclosure: 'portfolio-demo'` ajoute un badge « Démo portfolio » sur la carte
> et une explication dans la fenêtre de détail. Utilisez-le pour tout projet qui
> n'est pas une réalisation client réelle.

### Compétences

**`src/data/skills.ts`** — `level` (1 à 5) pilote l'affichage en pastilles.
Ajustez les niveaux à votre expérience réelle.

### Services et parcours

- **`src/data/services.ts`** : les prestations proposées.
- **`src/data/experience.ts`** : les domaines de compétence. Renseignez
  `company` et `period` pour afficher une expérience professionnelle datée
  (laisser vide plutôt que d'inventer).
- **`src/data/process.ts`** : les étapes de la méthode de travail.

### Navigation et SEO

**`src/config/site.ts`** : métadonnées, liste de navigation, provider du
formulaire de contact.

---

## 5. Images et fichiers personnels

Placez-les dans `public/` :

```
public/
├── portrait.jpg        # portrait professionnel (carré, 800x800 mini)
├── cv.pdf              # CV (renommer et mettre à jour profile.cvUrl)
├── favicon.svg         # monogramme KK
├── og-image.svg        # aperçu réseaux sociaux (voir section 7)
├── robots.txt          # généré au build
├── sitemap.xml         # généré au build
└── 404.html            # généré au build depuis scripts/404.template.html
```

Le portrait `public/portrait.jpg` est généré depuis `images/profil.png` (carré,
redimensionné en 1000x1000, ~120 Ko). Pour le remplacer, depositionnez votre
photo dans `public/` puis changez `profile.photo` dans
`src/config/profile.ts`.

---

## 6. Déploiement sur GitHub Pages

Le projet utilise **GitHub Actions** (`.github/workflows/deploy.yml`) :
à chaque `push` sur `main`, les dépendances sont installées, le site est
compilé et publié automatiquement.

### Mise en place

1. Poussez le projet sur un repository GitHub.
2. **Settings → Pages → Build and deployment → Source : _GitHub Actions_**.
3. Poussez sur `main` : le site est publié sur
   `https://<utilisateur>.github.io/<repository>/`.

Le workflow détecte automatiquement l'URL publique (site utilisateur ou site
projet) et la transmet au build pour générer `robots.txt` et `sitemap.xml`.

### Domaine personnalisé

Créez un fichier `public/CNAME` contenant votre domaine
(ex. `kabamba.dev`), puis configurez les enregistrements DNS chez votre
hébergeur. Pour un domaine à la racine, définissez `VITE_BASE_PATH=/` en
variable d'environnement du repository.

### Déploiement manuel

```bash
npm run build
npx gh-pages -d dist   # alternative hors GitHub Actions
```

> Le fichier `public/.nojekyll` est présent : il empêche GitHub Pages de
> traiter le dossier `dist` avec Jekyll.

---

## 7. SEO et performance

- **Métadonnées** : `index.html` (title, description, Open Graph, Twitter Card,
  mots-clés) + `src/config/site.ts`.
- **Données structurées** : une seule entité Schema.org de type `Person`,
  déclarée dans `index.html` et complétée au build par l'URL publique réelle.
- **URL publique centralisée** : `index.html` ne contient aucun domaine en dur,
  uniquement le jeton `__SITE_URL__`. `scripts/generate-seo.mjs` (avant build)
  génère `robots.txt`, `sitemap.xml` et `404.html` ; `scripts/inject-seo.mjs`
  (après build) injecte l'URL dans le canonical, l'Open Graph, le Twitter Card
  et le JSON-LD. Les deux scripts lisent la même configuration
  (`scripts/lib/site-env.mjs`).
  Le modèle de la page 404 est `scripts/404.template.html` : le jeton
  `__BASE_URL__` est remplacé par l'URL absolue du site, ce qui garantit que
  ses liens fonctionnent quelle que soit la profondeur de l'URL demandée.
- **Performance** : code splitting (React, Framer Motion et application
  séparés), polices chargées de façon non bloquante, `preconnect`,
  visuels générés en CSS (aucune image lourde), _tree-shaking_ des icônes,
  animations désactivées si le navigateur les refuse.
- **Open Graph** : `public/og-image.svg` est fourni. Twitter, Facebook et
  LinkedIn n'acceptant pas toujours le format SVG, exportez une version
  **PNG 1200 × 630** et remplacez la balise `og:image` dans `index.html`.

---

## 8. Accessibilité et animations

- Structure sémantique (`header`, `nav`, `main`, `section`, `footer`),
  lien d'évitement, `aria-current` sur la navigation active.
- Fenêtres de dialogue avec piège de focus, fermeture par `Escape` et
  restitution du focus (`src/components/ui/Modal.tsx`).
- Formulaire avec `aria-invalid`, messages d'erreur liés et région `aria-live`.
- Contrastes conformes WCAG AA dans les deux thèmes.
- `prefers-reduced-motion` est respecté : les animations d'apparition et de
  défilement sont désactivées, le contenu reste immédiatement visible.
- Mode sans JavaScript : le contenu reste lisible (styles `noscript`).

---

## 9. Responsive

Testé et ajusté pour **320, 375, 425, 768, 1024, 1440 et 1920 px**.
Menu mobile pleine largeur, grilles adaptatives, cibles tactiles d'au moins
40 px, aucune barre de défilement horizontale.

---

## 10. Structure du projet

```
src/
├── components/
│   ├── contact/     # formulaire de contact
│   ├── layout/      # Navbar, Footer, fond global
│   ├── projects/    # carte, visuel et fenêtre de détail des projets
│   ├── sections/    # Hero, About, Skills, Projects, Services,
│   │                # Experience, Process, Github, Contact
│   └── ui/          # Button, Section, Reveal, Modal, Tag, ThemeToggle…
├── config/          # profile.ts (vous), site.ts (SEO, navigation)
├── data/            # projects, skills, services, experience, process, stats
├── hooks/           # useTheme, useActiveSection, useToast, useGithubStats…
├── types/           # types TypeScript partagés
├── utils/           # cn, seo (métadonnées, partage, copie)
├── App.tsx
├── main.tsx
└── index.css        # design tokens, thème clair/sombre, animations

scripts/
├── lib/site-env.mjs   # configuration de déploiement partagée (SITE_URL, base path)
├── generate-seo.mjs   # robots.txt, sitemap.xml, 404.html (avant build)
├── inject-seo.mjs     # injection de l'URL publique dans dist/index.html (après build)
├── 404.template.html  # modèle de la page 404
├── ssr-smoke.mjs      # rendu serveur : vérifie le contenu de toutes les sections
└── browser-check.mjs  # contrôle du build dans Edge headless (DevTools)
```

> L'application est une **page unique** : pas de routeur, pas d'historique
> parasite, et des liens d'ancrage partageables (`/#contact`).

> **Thème** : sombre par défaut, conformément à l'identité visuelle. Le choix
> est mémorisé dans `localStorage` dès que vous basculez.

---

## 11. Personnaliser l'identité visuelle

Tout est centralisé dans `src/index.css` :

```css
:root {
  /* thème clair  */
  --brand: #e2551b;
  --accent: #0d8b80;
}

.dark {
  /* thème sombre (défaut) */
  --brand: #ff8a4c;
  --accent: #4fd6c5;
}
```

- Couleurs, rayons et typographie : variables `--color-*` dans `@theme`.
- Polices : `Space Grotesk` (titres), `Inter` (texte), `JetBrains Mono` (code) —
  lien `<link>` dans `index.html`.
- Palette des visuels de projets : `ACCENTS` dans
  `src/components/projects/ProjectCover.tsx`.
- Animations : keyframes dans `src/index.css` (`.card`, `.card-hover`,
  `.glass`, `.text-gradient`, `.halo`…).

---

## 12. Licence

Code source mis à disposition pour usage personnel.
Remplacez la mention du fichier `LICENSE` par celle de votre choix.
