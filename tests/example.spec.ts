import { test, expect } from '@playwright/test';

test.describe('SauceDemo Login – Bài tập hoàn chỉnh', () => {
  const url = 'https://www.saucedemo.com';

  // ============================================
  // TC1: Validation khi bỏ trống username/password
  // ============================================
  test('TC1 - Bỏ trống các trường bắt buộc', async ({ page }) => {
    await page.goto(url);

    await page.click('#login-button');

    const errorMsg = page.locator('[data-test="error"]');

    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText('Epic sadface: Username is required');
  });

  // ============================================
  // TC2: Username sai định dạng → báo lỗi credentials
  // ============================================
  test('TC2 - Sai định dạng username/email', async ({ page }) => {
    await page.goto(url);

    await page.fill('#user-name', 'abc123');  // sai định dạng email
    await page.fill('#password', '123');

    await page.click('#login-button');

    const errorMsg = page.locator('[data-test="error"]');

    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  // ============================================
  // TC3: Login thành công – So sánh 2 cách verify
  // ============================================
  test('TC3 - Login thành công (2 cách kiểm tra kết quả)', async ({ page }) => {
    await page.goto(url);

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');

    await page.click('#login-button');

    // ---- Cách 1: Verify URL redirect ----
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // ---- Cách 2: Verify theo element trên trang ----
    const title = page.locator('.title');
    await expect(title).toHaveText('Products');
  });

  // ============================================
  test('TC4 - Login thất bại khi password sai (2 cách kiểm tra)', async ({ page }) => {
  await page.goto(url);

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauc'); // sai intentionally

  await page.click('#login-button');

  const errorMsg = page.locator('[data-test="error"]');

  // ---- Cách 1: Kiểm tra text lỗi ----
  await expect(errorMsg).toHaveText(
    'Epic sadface: Username and password do not match any user in this service'
  );

  // ---- Cách 2: Kiểm tra icon lỗi hiển thị ----
  const errorIcon = page.locator('.error_icon').first();
  await expect(errorIcon).toBeVisible();
 });
});
