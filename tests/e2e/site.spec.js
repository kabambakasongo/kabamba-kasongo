const { test, expect } = require('@playwright/test');

const locales = [
  {
    name: 'fr',
    path: '/',
    lang: 'fr',
    code: 'FR',
    otherPath: 'index-en.html',
    emailError: 'Adresse e-mail invalide.',
    statusError: 'Corrigez les champs',
    tagline: 'Plateforme SaaS de gestion de complexes scolaires',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    themeLight: 'Activer le thème clair',
    themeDark: 'Activer le thème sombre',
  },
  {
    name: 'en',
    path: '/index-en.html',
    lang: 'en',
    code: 'EN',
    otherPath: 'index.html',
    emailError: 'Invalid email address.',
    statusError: 'Please correct the highlighted fields.',
    tagline: 'SaaS platform for managing school complexes',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    themeLight: 'Switch to light theme',
    themeDark: 'Switch to dark theme',
  },
];

for (const locale of locales) {
  test.describe(locale.name, function () {
    test.beforeEach(async function ({ page }) {
      await page.route('https://api.github.com/users/kabambakasongo**', async function (route) {
        const url = new URL(route.request().url());
        if (url.pathname.endsWith('/repos')) {
          await route.fulfill({ json: [] });
          return;
        }

        await route.fulfill({
          json: {
            public_repos: 8,
            followers: 12,
            avatar_url: 'https://example.test/avatar.jpg',
          },
        });
      });
      await page.goto(locale.path);
    });

    test('declares its language and links to the other locale', async function ({ page }) {
      await expect(page.locator('html')).toHaveAttribute('lang', locale.lang);
      await expect(page.locator('.site-header__actions .lang-switch__link.is-active')).toHaveText(
        locale.code
      );
      await expect(
        page.locator('.site-header__actions .lang-switch__link', { hasText: /^(FR|EN)$/ }).nth(locale.code === 'FR' ? 1 : 0)
      ).toHaveAttribute('href', locale.otherPath);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
        'href',
        'https://kabambakasongo.github.io/kabamba-kasongo/index-en.html'
      );
    });

    test('switches theme and persists the selection', async function ({ page }) {
      await expect(page.locator('#theme-toggle')).toHaveAttribute('title', locale.themeDark);
      await page.locator('#theme-toggle').click();
      await expect(page.locator('html')).toHaveClass(/dark/);

      await page.reload();

      await expect(page.locator('html')).toHaveClass(/dark/);
      await expect(page.locator('#theme-toggle')).toHaveAttribute('title', locale.themeLight);
    });

    test('opens and closes the mobile menu with Escape', async function ({ page }) {
      await page.setViewportSize({ width: 390, height: 844 });
      const toggle = page.locator('#nav-toggle');

      await expect(toggle).toHaveAttribute('aria-label', locale.menuOpen);
      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(toggle).toHaveAttribute('aria-label', locale.menuClose);
      await expect(page.locator('#mobile-menu')).toHaveAttribute('data-open', 'true');
      await page.keyboard.press('Escape');

      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(toggle).toBeFocused();
      await expect(toggle).toHaveAttribute('aria-label', locale.menuOpen);
    });

    test('filters projects and opens localized project details', async function ({ page }) {
      await page.locator('#project-filters [data-filter="desktop"]').click();

      await expect(page.locator('#project-grid [data-slug="majifuzo"]')).toBeVisible();
      await expect(page.locator('#project-grid [data-slug="schoolflow"]')).toBeHidden();

      await page.locator('#project-filters [data-filter="all"]').click();
      await page.locator('#project-grid [data-slug="schoolflow"] .project-card').click();

      await expect(page.locator('#project-modal')).toHaveClass(/show/);
      await expect(page.locator('#project-modal-title')).toHaveText('SchoolFlow');
      await expect(page.locator('#project-modal-tagline')).toHaveText(locale.tagline);
    });

    test('opens project details from the keyboard', async function ({ page }) {
      const card = page.locator('#project-grid [data-slug="schoolflow"] .project-card');
      await card.focus();
      await page.keyboard.press('Enter');

      await expect(page.locator('#project-modal')).toHaveClass(/show/);
      await expect(page.locator('#project-modal-title')).toHaveText('SchoolFlow');
    });

    test('reports invalid contact details without sending', async function ({ page }) {
      await page.locator('#contact-name').fill('Test Visiteur');
      await page.locator('#contact-email').fill('adresse-invalide');
      await page.locator('#contact-message').fill('Je souhaite discuter de mon projet.');
      await page.locator('#contact-submit').click();

      await expect(page.locator('#contact-email-error')).toHaveText(locale.emailError);
      await expect(page.locator('#contact-status')).toContainText(locale.statusError);
    });
  });
}
