import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads and displays main content', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /MPDEE/i })).toBeVisible();
    await expect(page.getByText(/Professional Web Design/i)).toBeVisible();
  });

  test('can navigate to work page', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('link', { name: /View Our Work|Work/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/work/);
    await expect(
      page.getByRole('heading', { name: /Our Work|Work/i })
    ).toBeVisible();
  });

  test('can navigate to services page', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('link', { name: /Services/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/services/);
    await expect(
      page.getByRole('heading', { name: /Services/i })
    ).toBeVisible();
  });

  test('can navigate to contact page', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('link', { name: /Get Started|Contact|Get in Touch/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(
      page.getByRole('heading', { name: /Get in Touch|Touch/i })
    ).toBeVisible();
  });

  test('header links work', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
    await page.getByRole('link', { name: 'Work' }).click();
    await expect(page).toHaveURL('/work');
    await page.getByRole('link', { name: 'Services' }).click();
    await expect(page).toHaveURL('/services');
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL('/contact');
  });
});
