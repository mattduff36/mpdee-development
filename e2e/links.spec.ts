import { test, expect } from '@playwright/test';

test.describe('Internal Links', () => {
  test('homepage has working internal links', async ({ page }) => {
    await page.goto('/');
    const links = await page.getByRole('link').all();
    const hrefs = await Promise.all(links.map(l => l.getAttribute('href')));
    const internalLinks = hrefs.filter(
      (h): h is string =>
        !!h && (h.startsWith('/') || h.startsWith('http://localhost'))
    );
    for (const href of internalLinks.slice(0, 5)) {
      const url = href.startsWith('/') ? `http://localhost:3000${href}` : href;
      const response = await page.goto(url);
      if (response) {
        expect(response.status()).toBeLessThan(400);
      }
    }
  });

  test('work page displays project cards', async ({ page }) => {
    await page.goto('/work');
    await expect(page.getByRole('heading', { name: /work/i })).toBeVisible();
    const projectLinks = page.getByRole('link', { name: /view project/i });
    await expect(projectLinks.first()).toBeVisible({ timeout: 5000 });
  });

  test('services page displays service cards', async ({ page }) => {
    await page.goto('/services');
    await expect(
      page.getByRole('heading', { name: /services/i })
    ).toBeVisible();
    await expect(page.getByText(/Starter|Basic|Pro Package/i)).toBeVisible();
  });
});
