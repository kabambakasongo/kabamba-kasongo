# KABAMBA KASONGO — Portfolio

Portfolio personnel de **KABAMBA KASONGO**, **formateur ERP & développeur
Full-Stack** basé à **Kolwezi, République Démocratique du Congo**. Le site
présente les deux activités : formations aux ERP (SAP S/4HANA, Odoo, Sage,
Microsoft Dynamics, paie et droit social) et conception d'applications web,
SaaS et de gestion.

Site **100 % statique** : HTML, CSS et JavaScript natifs, complétés par
Bootstrap 5.3.8 et Bootstrap Icons 1.13.1 **embarqués dans le dépôt**.

- **Aucune dépendance distante** (CDN, Google Fonts, frameworks externes) :
  polices, icônes et bibliothèques sont dans le dépôt
- **Aucune étape de build** : pas de `npm install`, pas de bundler, pas de
  compilation
- **Deux requêtes externes facultatives**, déjà prévues et tolérantes à un
  blocage : l'API GitHub publique et l'avatar hébergé par GitHub
- **Aucun backend, aucune base de données, aucune clé secrète, aucun cookie**
- Hébergeable tel quel sur **GitHub Pages**, y compris depuis la racine du dépôt

---

## 1. Démarrage

Il n'y a rien à installer. Deux options :

```bash
# 1. Ouvrir directement le fichier
start index.html

# 2. Servir le dossier (recommandé : requis pour l'API GitHub)
python -m http.server 8080   # puis http://localhost:8080
```

> Un serveur local est préférable à `file://` : le navigateur bloque les
> requêtes `fetch` vers une API externe depuis un fichier local, la section
> GitHub resterait donc muette. Sous VS Code, l'extension *Live Server* fait
> le même travail.

---

## 2. Contenu du dépôt

| Fichier / dossier                | Rôle                                                        |
| -------------------------------- | ----------------------------------------------------------- |
| `index.html`                     | La page unique : contenu, métadonnées, données structurées  |
| `404.html`                       | Page d'erreur 404 (liens absolus : fonctionne à toute URL)  |
| `assets/css/main.css`            | Design tokens, thème clair/sombre, composants, animations   |
| `assets/js/main.js`              | Comportements : thème, menu, filtres, modale, formulaire     |
| `assets/fonts/`                  | Space Grotesk, Inter, JetBrains Mono (sous-ensemble latin)   |
| `vendor/bootstrap/`              | Bootstrap 5.3.8 (CSS + JS)                                  |
| `vendor/bootstrap-icons/`        | Bootstrap Icons 1.13.1 (police + CSS)                       |
| `favicon.svg`                    | Monogramme KK                                               |
| `apple-touch-icon.png`           | Icône iOS 180 × 180                                         |
| `og-image.jpg`                   | Aperçu réseaux sociaux 1200 × 630                           |
| `assets/img/`                    | Portrait optimisé (AVIF/WebP/JPEG) + icônes PWA 192/512     |
| `cv-fr.html` / `cv-en.html`      | CV imprimable en français et en anglais (A4)                |
| `assets/css/cv.css`              | Styles partagés des deux CV                                 |
| `Kabamba_Kasongo_CV_FR.pdf`      | CV français téléchargeable (aussi `Kabamba_Kasongo.pdf`)    |
| `Kabamba_Kasongo_CV_EN.pdf`      | CV anglais téléchargeable                                   |
| `manifest.webmanifest`           | Nom, icônes et couleurs de l'application installée          |
| `robots.txt` / `sitemap.xml`     | Référencement                                               |
| `.nojekyll`                      | Empêche GitHub Pages de traiter le dossier avec Jekyll      |
| `LICENSE`                        | Licence MIT                                                 |
| `.htmlvalidate.json`             | Règles de validation HTML locales                           |
| `.github/workflows/quality.yml`  | CI : HTML, liens, accessibilité, Lighthouse                 |

---

## 3. Mes informations

Il n'y a **pas de fichier de configuration** : tout est dans `index.html` (et
`assets/js/main.js` pour deux valeurs). C'est le prix de la simplicité — en
revanche, un simple *rechercher-remplacer* suffit.

| Information             | Où la remplacer                                                |
| ----------------------- | -------------------------------------------------------------- |
| Adresse e-mail          | `index.html` + `CONTACT_EMAIL` et `data-copy` dans `main.js`   |
| Numéro WhatsApp         | `index.html` (lien `wa.me/…` **et** numéro affiché)            |
| Identifiant GitHub      | `index.html` + `GITHUB_USER` dans `main.js`                    |
| Lien LinkedIn           | `index.html`                                                    |
| Portrait                | Remplacer `assets/img/hero-portrait-*` (400/800 px, AVIF/WebP/JPEG) ; l'avatar de secours est `assets/img/avatar-144.*` (`portrait.jpg` et `profiles.jpg` sont les sources) |
| CV (PDF)                | Éditer `cv-fr.html` / `cv-en.html`, puis exporter (section 8)  |
| Statistiques (06, 29…)  | Section « À propos »                                           |
| Badge de disponibilité  | Section Hero                                                   |
| Délai de réponse (48 h) | Sections Hero et Contact                                       |

Vérifier qu'un remplacement a bien été appliqué partout :

```bash
# sur Windows PowerShell
Select-String -Path index.html, assets/js/main.js -Pattern "ledouxkabamba135"
```

**Ne jamais inventer de coordonnées.** Si une information n'est pas réelle,
retirez simplement le bloc correspondant : aucun lien mort ne subsiste.

---

## 4. Ajouter ou modifier un projet

Un projet se décrit à **trois endroits** de `index.html` :

1. **La carte** dans `#project-grid` :

   ```html
   <div class="col-md-6 col-xl-4 reveal" data-categories="saas web" data-slug="mon-projet">
     <article class="card card-hover project-card h-100" role="button" tabindex="0"
              aria-label="Détails du projet Mon Projet">
       <div class="project-cover" style="--accent: #ff6a3d">
         <span class="monogram-cover">MP</span>
       </div>
       <div class="p-4 d-flex flex-column h-100">
         <h3 class="font-display fs-5 fw-semibold mb-0" style="color: var(--ink)">Mon Projet</h3>
         <p class="text-muted-2 mb-3" style="font-size: 0.88rem">Phrase courte affichée sur la carte</p>
         <div class="d-flex flex-wrap gap-2 mt-auto">
           <span class="tag">Python</span><span class="tag">Django</span>
         </div>
       </div>
     </article>
   </div>
   ```

2. **Le modèle de détail** `<template id="tpl-mon-projet">` : description,
   chiffres clés, fonctionnalités, technologies. Le `slug` du `<template>`
   doit correspondre au `data-slug` de la carte.

3. **La phrase de sous-titre** dans l'objet `taglines` de `main.js`
   (utilisée dans l'en-tête de la modale).

Les filtres de la barre de filtres correspondent aux valeurs listées dans
`data-categories`. Pour **retirer** un projet, supprimer les points 1 et 2 ;
pour **le masquer temporairement**, retirer sa catégorie des filtres.

> Les cartes portent le badge « Démo portfolio » lorsqu'il s'agit d'une
> démonstration et non d'une réalisation réelle. À retirer pour un vrai
> client, et à remplacer par une mention de rôle (`Conçu et développé par…`).

---

## 5. Formulaire de contact

GitHub Pages n'offre aucun backend : l'envoi passe soit par le client de
messagerie du visiteur, soit par un service externe compatible statique. Le
choix se fait sur le `<form id="contact-form">`, **sans toucher au JavaScript** :

```html
<form id="contact-form" novalidate
      data-provider="none"      <!-- ou "web3forms", ou "formspree" -->
      data-endpoint=""          <!-- endpoint Formspree si utilisé -->
      data-access-key="">       <!-- clé publique Web3Forms si utilisée -->
```

| `data-provider` | Comportement                                                    |
| --------------- | --------------------------------------------------------------- |
| `none`          | **Défaut.** Compose le message et l'ouvre dans le client e-mail |
| `formspree`     | `POST` JSON vers `data-endpoint`                                |
| `web3forms`     | `POST` JSON vers `api.web3forms.com` avec `data-access-key`     |

Le formulaire valide le nom, l'e-mail et la longueur du message, et contient
un champ piège anti-spam (`#contact-website`, invisible). Les clés de services
externes sont **publiques par conception** : aucun secret dans le dépôt.

---

## 6. Identité visuelle

Tout est centralisé dans `assets/css/main.css` :

```css
:root {            /* thème clair */
  --brand: #bf4310;   /* orange assez profond pour passer AA sur blanc */
  --accent: #0d8b80;
}

.dark {            /* thème sombre (défaut) */
  --brand: #ff8a4c;
  --accent: #4fd6c5;
}
```

- **Couleurs, rayons, typographie** : variables `--canvas`, `--surface`,
  `--ink`, `--line`… puis reportées sur les variables Bootstrap
  (`--bs-body-bg`, `--bs-primary`…) : une seule bascule de classe suffit à
  réaligner tous les composants.
- **Polices** : `assets/fonts/`. Pour en changer, déposer les fichiers
  `.woff2` et modifier les blocs `@font-face` en tête de `main.css`.
- **Couleur d'un projet** : l'attribut `style="--accent: #…"` de sa carte. Ces
  teintes sont pensées pour le thème sombre ; en thème clair, `main.css` les
  assombrit automatiquement (`color-mix`) pour rester lisibles sur fond blanc.
- **Animations** : keyframes en section 6 de `main.css`.

Le mode sombre est appliqué **avant le premier rendu** par un script en tête
de `index.html` : aucun flash au chargement. Le choix est mémorisé dans
`localStorage` (`kk-theme`) et la balise `theme-color` suit.

---

## 7. SEO

`index.html` porte le titre, la description, les mots-clés, Open Graph,
Twitter Card et une entité Schema.org `Person`. Le contenu est 100 % statique :
aucune URL n'est devinée, mais l'URL publique est écrite en dur à **cinq
endroits**. Pour changer de domaine, tous sont à mettre à jour :

| Fichier               | Ce qu'il contient                                        |
| --------------------- | --------------------------------------------------------- |
| `index.html`          | `canonical`, `og:url`, `og:image`, `twitter:image`, JSON-LD |
| `robots.txt`          | `Sitemap:`                                               |
| `sitemap.xml`         | `<loc>`                                                   |
| `404.html`            | `favicon`, CSS et boutons (liens absolus)                 |

> **Open Graph** : `og-image.jpg` est une image **JPEG 1200 × 630** (poids
> contenu), acceptée par Twitter, Facebook et LinkedIn. Pour la régénérer,
> modifiez `og-image.svg` puis exportez en JPEG à cette taille.

---

## 8. CV

Le CV existe en **deux langues** :

- `cv-fr.html` — source imprimable française (A4, polices locales) ;
- `cv-en.html` — source imprimable anglaise ;
- `assets/css/cv.css` — styles partagés par les deux versions ;
- `Kabamba_Kasongo_CV_FR.pdf` — PDF français (bouton « Mon CV » du hero et
  « CV français » de la section contact) ;
- `Kabamba_Kasongo_CV_EN.pdf` — PDF anglais (bouton « CV English ») ;
- `Kabamba_Kasongo.pdf` — copie du PDF français, conservée pour les anciens
  liens.

Pour les modifier, éditez le HTML puis régénérez les deux PDF avec Chrome ou
Edge en mode headless (aucune dépendance à installer) :

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --headless=new --disable-gpu --no-pdf-header-footer `
  --print-to-pdf="Kabamba_Kasongo_CV_FR.pdf" `
  "file:///C:/chemin/vers/kabamba-kasongo/cv-fr.html"

& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --headless=new --disable-gpu --no-pdf-header-footer `
  --print-to-pdf="Kabamba_Kasongo_CV_EN.pdf" `
  "file:///C:/chemin/vers/kabamba-kasongo/cv-en.html"
```

Les deux documents sont calibrés pour tenir sur **une page A4**.

---

## 9. Vérifications locales

La CI (`.github/workflows/quality.yml`) exécute quatre contrôles à chaque
push : validation HTML (`html-validate`), liens morts (`lychee`),
accessibilité (`pa11y-ci`, WCAG 2 AA) et Lighthouse. Pour les lancer en local :

```bash
npx --yes html-validate@9 index.html 404.html cv-fr.html cv-en.html
npx --yes pa11y-ci@4 --standard WCAG2AA http://localhost:8080/
```

Les règles de `html-validate` sont dans `.htmlvalidate.json` : les règles
purement stylistiques sont désactivées pour ne garder que les erreurs réelles.
L'audit `pa11y` lit `.pa11yci` (WCAG 2 AA, `http://localhost:8080/`).

---

## 10. Déploiement sur GitHub Pages

Le site n'a pas de build : **GitHub Pages publie directement le contenu de la
branche**, sans workflow ni artefacts.

1. Poussez le dépôt sur GitHub.
2. **Settings → Pages → Build and deployment → Source : _Deploy from a
   branch_**, branche `main`, dossier `/ (root)`**.
3. Enregistrez : le site est publié sur
   `https://<utilisateur>.github.io/<repository>/` en quelques secondes.

<details>
<summary>Si vos Pages sont configurées sur « GitHub Actions »</summary>

Il faut soit repasser en mode branche (ci-dessus), soit restaurer un
workflow minimal qui publie la racine du dépôt :

```yaml
name: Deploy
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - id: deployment
        uses: actions/deploy-pages@v4
```

</details>

**Domaine personnalisé** : créez un fichier `CNAME` à la racine contenant
votre domaine, puis configurez les enregistrements DNS chez votre hébergeur.
Les chemins sont tous relatifs, le site fonctionne donc à la racine comme dans
un sous-dossier.

---

## 11. Accessibilité et animations

- Structure sémantique (`header`, `nav`, `main`, `section`, `footer`), lien
  d'évitement, `aria-current` implicite via `.is-active` sur la navigation.
- Les cartes de projet sont des boutons : ouverture au clic **et** à
  `Entrée` / `Espace`. La modale piège le focus, se ferme par `Échap` et
  restitue le focus à la carte d'origine.
- Formulaire : erreurs liées au champ (`aria-describedby` implicite via les
  identifiants), bouton désactivé pendant l'envoi, région `aria-live`.
- Contrastes conformes WCAG AA dans les deux thèmes.
- `prefers-reduced-motion` est respecté : apparitions, bandeau rotatif,
  défilement fluide et marée sont désactivés, le contenu reste visible.
- Sans JavaScript : le contenu reste lisible, la navigation par ancres
  fonctionne, seule la modale de détail est inopérante.

---

## 12. Responsive

Conçu et vérifié pour **375, 425, 768, 1024, 1440 et 1920 px** : menu mobile en
panneau plein écran, grilles Bootstrap qui se replient, cibles tactiles d'au
moins 40 px, aucune barre de défilement horizontale.

---

## 13. Structure

```
.
├── index.html               page unique + données structurées
├── 404.html                 page d'erreur
├── cv-fr.html               CV français imprimable
├── cv-en.html               CV anglais imprimable
├── Kabamba_Kasongo_CV_FR.pdf  CV français téléchargeable
├── Kabamba_Kasongo_CV_EN.pdf  CV anglais téléchargeable
├── Kabamba_Kasongo.pdf      ancien lien → copie du CV français
├── robots.txt / sitemap.xml
├── manifest.webmanifest
├── favicon.svg / apple-touch-icon.png / og-image.jpg
├── LICENSE / .htmlvalidate.json / .pa11yci
├── .github/workflows/quality.yml
├── assets/
│   ├── css/main.css         tokens, thème, composants, animations
│   ├── css/cv.css           styles partagés des CV FR/EN
│   ├── js/main.js           thème, menu, filtres, modale, formulaire, GitHub
│   ├── img/                 portrait AVIF/WebP/JPEG + icônes PWA
│   └── fonts/               3 woff2 (latin)
└── vendor/
    ├── bootstrap/           5.3.8
    └── bootstrap-icons/     1.13.1
```

> L'application est une **page unique** : pas de routeur, pas d'historique
> parasite, des liens d'ancrage partageables (`/#contact`).

---

## 14. Ce que le projet ne contient pas

Par choix, et pour que ce dépôt reste auditable d'un bout à l'autre :

- ni build, ni bundler, ni `node_modules` ;
- ni dépendance distante (CDN, Google Fonts, Frameworks externes) ;
- ni backend, ni base de données, ni secret ;
- ni traqueur, ni cookie, ni service d'analyse d'audience.

Les seules requêtes sortantes sont l'appel à l'API **publique** GitHub
(`api.github.com`) et l'image d'avatar que GitHub héberge
(`avatars.githubusercontent.com`). Elles échouent sans conséquence si le
visiteur les bloque : le site reste entièrement lisible et navigable.

---

## 15. Licence

Code source sous **licence MIT** (voir `LICENSE`).
