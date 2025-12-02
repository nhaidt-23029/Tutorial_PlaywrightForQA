// auth.setup.ts
import { test as setup, expect } from '@playwright/test';

setup.use({ browserName: 'chromium' });

setup('create auth.json', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({ path: 'auth.json' });
});