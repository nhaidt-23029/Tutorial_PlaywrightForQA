import { test, expect } from '../../fixtures';
test.describe('Login thất bại', () => {
  test('Sai mật khẩu', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('wrong_password');
    await page.locator('#login-button').click();

    const error = page.locator('[data-test="error"]');
    await expect(error).toHaveText(/Epic sadface: Username and password do not match/);
  });

  test('Bỏ trống username', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const error = page.locator('[data-test="error"]');
    await expect(error).toHaveText(/Epic sadface: Username is required/);
  });

  test('Locked out user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('locked_out_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    const error = page.locator('[data-test="error"]');
    await expect(error).toHaveText(/Epic sadface: Sorry, this user has been locked out/);
  });
});