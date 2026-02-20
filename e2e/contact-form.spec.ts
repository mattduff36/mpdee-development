import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('displays contact form fields', async ({ page }) => {
    await expect(page.getByLabel(/name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/phone/i)).toBeVisible();
    await expect(page.getByLabel(/project/i)).toBeVisible();
    await expect(
      page.getByRole('button', { name: /send message/i })
    ).toBeVisible();
  });

  test('shows validation error for empty required fields', async ({ page }) => {
    await page.getByRole('button', { name: /send message/i }).click();
    await expect(
      page.getByText(/name is required|email is required/i)
    ).toBeVisible();
  });

  test('shows validation error for invalid email', async ({ page }) => {
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('invalid-email');
    await page.getByRole('button', { name: /send message/i }).click();
    await expect(page.getByText(/valid email/i)).toBeVisible();
  });

  test('accepts valid input and submits', async ({ page }) => {
    await page.getByLabel(/name/i).fill('Test User');
    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/project/i).fill('Test project details');
    await page.getByRole('button', { name: /send message/i }).click();
    await expect(
      page.getByText(/sending|message sent|thank you|failed|try again/i)
    ).toBeVisible({ timeout: 15000 });
  });
});
