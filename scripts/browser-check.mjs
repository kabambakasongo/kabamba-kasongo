/**
 * Verification navigateur du build de production (protocole DevTools).
 * Lance Microsoft Edge en mode headless, ouvre le site, collecte les
 * erreurs console et verifie le rendu + quelques interactions.
 */
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const URL_TO_TEST = process.argv[2] ?? 'http://localhost:4173/';
const PORT = 9333;

const edge = spawn(EDGE, [
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  `--remote-debugging-port=${PORT}`,
  '--user-data-dir=' + process.env.TEMP + '\\opencode\\edge-cdp',
  'about:blank',
]);

let ws;
let nextId = 1;
const pending = new Map();
const problems = [];

const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const id = nextId++;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params, sessionId }));
  });

const evaluate = async (expression) => {
  const result = await send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) {
    throw new Error(
      result.exceptionDetails.text + ' ' + (result.exceptionDetails.exception?.description ?? ''),
    );
  }
  return result.result.value;
};

const check = (label, value, expected) => {
  const ok = typeof expected === 'function' ? expected(value) : value === expected;
  console.log(`${ok ? 'OK  ' : 'FAIL'} ${label} => ${JSON.stringify(value)}`);
  if (!ok) problems.push(label);
};

/** Attend qu'une expression deviennent vraie (avec delai maximal). */
const waitFor = async (expression, timeout = 10000) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (await evaluate(expression)) return true;
    await delay(300);
  }
  return false;
};

try {
  let targets;
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      targets = await res.json();
      if (targets.some((t) => t.type === 'page')) break;
    } catch {
      /* le navigateur demarre */
    }
    await delay(300);
  }
  const page = targets?.find((t) => t.type === 'page');
  if (!page) throw new Error('Aucune page Edge disponible');

  ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });

  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
      return;
    }
    if (message.method === 'Runtime.exceptionThrown') {
      const details = message.params.exceptionDetails;
      problems.push(`Exception: ${details.exception?.description ?? details.text}`);
      console.log('FAIL exception ->', details.exception?.description ?? details.text);
    }
    if (
      message.method === 'Runtime.consoleAPICalled' &&
      ['error', 'warning'].includes(message.params.type)
    ) {
      const text = message.params.args.map((a) => a.value ?? a.description ?? '').join(' ');
      if (text.includes('Download the React DevTools')) return;
      problems.push(`Console ${message.params.type}: ${text}`);
      console.log(`FAIL console.${message.params.type} ->`, text);
    }
  });

  await send('Runtime.enable');
  await send('Page.enable');
  await send('Network.enable');
  await send('Network.setCacheDisabled', { cacheDisabled: true });
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  await send('Page.navigate', { url: 'about:blank' });
  await delay(300);
  await send('Page.navigate', { url: URL_TO_TEST });
  await delay(4500);

  console.log('--- Rendu (1440x900) ---');
  check('titre', await evaluate('document.title'), 'KABAMBA KASONGO | Full-Stack Developer');
  check(
    'sections',
    await evaluate('document.querySelectorAll("main section").length'),
    (v) => v >= 9,
  );
  check(
    'h1',
    await evaluate('document.querySelector("h1")?.innerText.replace(/\\n/g," ")'),
    'KABAMBA KASONGO',
  );
  check(
    'cartes projets',
    await evaluate('document.querySelectorAll("#projets article").length'),
    6,
  );
  check(
    'liens de nav',
    await evaluate(
      'document.querySelectorAll("nav[aria-label=\\"Navigation principale\\"] ul li").length',
    ),
    8,
  );
  check(
    'theme sombre par defaut',
    await evaluate('document.documentElement.classList.contains("dark")'),
    true,
  );
  check(
    'fond du body',
    await evaluate('getComputedStyle(document.body).backgroundColor'),
    'rgb(10, 11, 13)',
  );
  // Les polices sont chargees de maniere non bloquante : on attend leur
  // chargement (avec une limite) puis on verifie qu'aucune n'a echoue.
  await waitFor('document.fonts.status === "loaded" && document.fonts.size > 0', 10000);
  check('polices chargees', await evaluate('document.fonts.status'), 'loaded');
  check(
    'aucune police en erreur',
    await evaluate('[...document.fonts].filter(f => f.status === "error").length'),
    0,
  );
  check(
    '3 familles disponibles',
    await evaluate('new Set([...document.fonts].map(f => f.family)).size'),
    (v) => v >= 3,
  );
  check(
    'pas de scroll horizontal',
    await evaluate('document.documentElement.scrollWidth <= window.innerWidth + 1'),
    true,
  );
  check(
    'meta description',
    await evaluate('document.querySelector("meta[name=description]")?.content.length > 80'),
    true,
  );
  check(
    'JSON-LD',
    await evaluate('!!document.querySelector("script[type=\\"application/ld+json\\"]")'),
    true,
  );
  // SEO : aucune URL en dur, un seul jeton remplace au build, et canonical,
  // Open Graph et JSON-LD doivent designer exactement la meme adresse.
  check(
    'jeton __SITE_URL__ remplace',
    await evaluate('!document.documentElement.outerHTML.includes("__SITE_URL__")'),
    true,
  );
  const canonical = await evaluate('document.querySelector("link[rel=canonical]").href');
  const ogUrl = await evaluate('document.querySelector("meta[property=\\"og:url\\"]").content');
  const ldUrl = JSON.parse(
    await evaluate('document.querySelector("script[type=\\"application/ld+json\\"]").textContent'),
  ).url;
  check('canonical = og:url', canonical === ogUrl, true);
  // En l'absence de SITE_URL, le build utilise un domaine de remplacement
  // reserve alors que le canonical a l'execution suit le domaine visite :
  // on verifie donc la coherence, pas l'egalite stricte.
  check(
    'JSON-LD coherent avec le canonical',
    new URL(ldUrl).host === new URL(canonical).host || ldUrl.endsWith('.example/'),
    true,
  );
  check(
    'une seule entite JSON-LD',
    await evaluate('document.querySelectorAll("script[type=\\"application/ld+json\\"]").length'),
    1,
  );

  console.log('--- Interactions ---');
  await evaluate('document.querySelector("[aria-controls=menu-mobile]").click()');
  check('menu mobile ouvert', await waitFor('!!document.getElementById("menu-mobile")'), true);
  await evaluate('document.querySelector("[aria-controls=menu-mobile]").click()');
  check('menu mobile ferme', await waitFor('!document.getElementById("menu-mobile")'), true);

  // On donne le focus au bouton comme le ferait un vrai clic utilisateur,
  // afin de verifier la restitution du focus a la fermeture.
  await evaluate(
    `[...document.querySelectorAll("button")].find(b => b.textContent.trim() === "Voir le projet").focus()`,
  );
  await evaluate(
    `[...document.querySelectorAll("button")].find(b => b.textContent.trim() === "Voir le projet").click()`,
  );
  check(
    'fenetre de projet ouverte',
    await waitFor('!!document.querySelector("[role=dialog]")'),
    true,
  );
  check(
    'titre du projet',
    await evaluate('document.querySelector("[role=dialog] h3")?.textContent'),
    'SchoolFlow',
  );
  check(
    'focus deplace dans la fenetre',
    await waitFor(
      'document.querySelector("[role=dialog]")?.contains(document.activeElement) === true',
      4000,
    ),
    true,
  );
  await send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27,
  });
  await send('Input.dispatchKeyEvent', {
    type: 'keyUp',
    key: 'Escape',
    code: 'Escape',
    windowsVirtualKeyCode: 27,
  });
  await delay(500);
  check('fenetre refermee', await waitFor('!document.querySelector("[role=dialog]")'), true);
  check(
    'focus restaure',
    await evaluate('document.activeElement?.textContent?.trim()'),
    'Voir le projet',
  );

  await evaluate(
    '[...document.querySelectorAll("button")].find(b => b.getAttribute("role") === "switch").click()',
  );
  check(
    'bascule theme clair',
    await waitFor('!document.documentElement.classList.contains("dark")'),
    true,
  );
  check(
    'fond clair',
    await evaluate('getComputedStyle(document.body).backgroundColor'),
    'rgb(246, 246, 243)',
  );
  await evaluate(
    '[...document.querySelectorAll("button")].find(b => b.getAttribute("role") === "switch").click()',
  );
  await waitFor('document.documentElement.classList.contains("dark")');

  await evaluate(
    `[...document.querySelectorAll("#projets button")].find(b => b.textContent.trim().startsWith("SaaS")).click()`,
  );
  check(
    'filtre SaaS (3 projets)',
    await waitFor('document.querySelectorAll("#projets article").length === 3', 6000),
    true,
  );
  await evaluate(
    `[...document.querySelectorAll("#projets button")].find(b => b.textContent.trim().startsWith("Tous")).click()`,
  );
  check(
    'filtre Tous (6 projets)',
    await waitFor('document.querySelectorAll("#projets article").length === 6', 6000),
    true,
  );

  console.log('--- Responsive ---');
  for (const width of [320, 375, 425, 768, 1024, 1920]) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height: 800,
      deviceScaleFactor: 1,
      mobile: width < 768,
    });
    await delay(350);
    const overflow = await evaluate('document.documentElement.scrollWidth - window.innerWidth');
    const visible = await evaluate('getComputedStyle(document.querySelector("h1")).fontSize');
    check(`pas de debordement @${width}px`, overflow, (v) => v <= 1);
    if (width === 375) {
      await evaluate('document.querySelector("[aria-controls=menu-mobile]").click()');
      await delay(400);
      check(
        'menu mobile visible @375px',
        await evaluate('!!document.getElementById("menu-mobile")'),
        true,
      );
      await evaluate('document.querySelector("[aria-controls=menu-mobile]").click()');
      await delay(200);
    }
    console.log(`     h1 font-size @${width}px = ${visible}`);
  }

  console.log('--- Accessibilite ---');
  check('un seul h1', await evaluate('document.querySelectorAll("h1").length'), 1);
  check(
    'images avec alt',
    await evaluate('[...document.querySelectorAll("img")].every(i => i.hasAttribute("alt"))'),
    true,
  );
  check(
    'boutons avec nom accessible',
    await evaluate(
      '[...document.querySelectorAll("button")].every(b => (b.innerText || "").trim() || b.getAttribute("aria-label") || b.title)',
    ),
    true,
  );
  check(
    'liens externes securises',
    await evaluate(
      '[...document.querySelectorAll("a[target=_blank]")].every(a => (a.rel || "").includes("noopener"))',
    ),
    true,
  );
  check(
    'liens internes valides',
    await evaluate(
      '[...document.querySelectorAll("a[href^=\\"#\\"]")].every(a => a.getAttribute("href") === "#" || document.querySelector(a.getAttribute("href")))',
    ),
    true,
  );
  check(
    'lien d evitement',
    await evaluate('!!document.querySelector("a[href=\\"#contenu\\"]")'),
    true,
  );

  console.log('--- Apparition au defilement ---');
  await evaluate('document.getElementById("projets").scrollIntoView()');
  await delay(1200);
  check(
    'contenu revele (opacite 1)',
    await evaluate(
      'Number(getComputedStyle(document.querySelector("#projets article")).opacity) === 1',
    ),
    true,
  );

  console.log('--- Mode animations reduites ---');
  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });
  await send('Page.reload', { ignoreCache: true });
  await delay(3500);
  check(
    'sections visibles sans animation',
    await evaluate('Number(getComputedStyle(document.getElementById("apropos")).opacity) === 1'),
    true,
  );
  check(
    'bandeau defilant fige',
    await evaluate('getComputedStyle(document.querySelector(".animate-marquee")).animationName'),
    'none',
  );
  await send('Emulation.setEmulatedMedia', { features: [] });

  console.log('--- Page 404 ---');
  // `vite preview` sert index.html pour les routes inconnues (comme un SPA).
  // Sur GitHub Pages, c'est bien 404.html qui est servi : on le teste directement.
  await send('Page.navigate', { url: URL_TO_TEST + '404.html' });
  await delay(1200);
  check('404 affichee', await evaluate('document.title'), 'Page introuvable — KABAMBA KASONGO');
  check(
    '404 indexable',
    await evaluate('document.querySelector("meta[name=robots]").content'),
    'noindex, follow',
  );
  // L'URL doit etre absolue : les liens fonctionnent depuis n'importe quelle profondeur.
  check(
    'lien de retour absolu',
    await evaluate('new URL(document.querySelector(".primary").href).href'),
    (v) => /^https?:\/\/[^/]+\/$/.test(v),
  );
  check(
    'lien contact',
    await evaluate('new URL(document.querySelectorAll("a.button")[1].href).hash'),
    '#contact',
  );
  check('aucun script inline', await evaluate('document.querySelectorAll("script").length'), 0);

  console.log(`\nProblemes detectes : ${problems.length}`);
  if (problems.length) {
    process.exitCode = 1;
  }
} catch (error) {
  console.error('ECHEC :', error.message);
  process.exitCode = 1;
} finally {
  try {
    ws?.close();
  } catch {
    /* ignore */
  }
  edge.kill();
}
