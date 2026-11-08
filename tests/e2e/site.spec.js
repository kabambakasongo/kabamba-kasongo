const { test, expect } = require('@playwright/test');

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
  await page.goto('/');
});

test('switches theme and persists the selection', async function ({ page }) {
  await page.locator('#theme-toggle').click();
  const isDark = await page.locator('html').evaluate(function (html) {
    return html.classList.contains('dark');
  });
  const selectedTheme = isDark ? 'dark' : 'light';

  await page.reload();

  await expect(page.locator('html')).toHaveClass(
    selectedTheme === 'dark' ? /dark/ : /^(?!.*dark).*$/
  );
});

test('opens and closes the mobile menu with Escape', async function ({ page }) {
  await page.setViewportSize({ width: 390, height: 844 });
  const toggle = page.locator('#nav-toggle');

  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#mobile-menu')).toHaveAttribute('data-open', 'true');
  await page.keyboard.press('Escape');

  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
});

test('filters projects and opens project details', async function ({ page }) {
  await page.locator('#project-filters [data-filter="desktop"]').click();

  await expect(page.locator('#project-grid [data-slug="majifuzo"]')).toBeVisible();
  await expect(page.locator('#project-grid [data-slug="schoolflow"]')).toBeHidden();

  await page.locator('#project-filters [data-filter="all"]').click();
  await page.locator('#project-grid [data-slug="schoolflow"] .project-card').click();

  await expect(page.locator('#project-modal')).toHaveClass(/show/);
  await expect(page.locator('#project-modal-title')).toHaveText('SchoolFlow');
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

  await expect(page.locator('#contact-email-error')).toContainText('Adresse e-mail invalide.');
  await expect(page.locator('#contact-status')).toContainText('Corrigez les champs');
});
