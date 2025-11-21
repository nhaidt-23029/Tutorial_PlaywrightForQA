import { test, expect } from '@playwright/test';

// 1. SETUP: Chạy TRƯỚC mỗi test case
test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  
  // Đợi trang load xong
  await expect(page).toHaveURL(/.*inventory.html/);
});

// 2. TEARDOWN: Chạy SAU mỗi test case
test.afterEach(async ({ page }, testInfo) => {
  // Nếu test fail thì chụp màn hình
  if (testInfo.status === 'failed') {
    const screenshotName = `screenshots/${testInfo.title.replace(/\s/g, '_')}_fail.png`;
    await page.screenshot({ path: screenshotName, fullPage: true });
  }

  // Logout
  await page.click('#react-burger-menu-btn'); 
  await page.click('#logout_sidebar_link');   
  
  // Check đã về màn hình login
  await expect(page.locator('#login-button')).toBeVisible();
});

// 3. TEST CASES
test('Test 1: Kiểm tra URL sau khi login', async ({ page }) => {
  await expect(page).toHaveURL(/.*inventory.html/);
});

test('Test 2: Kiểm tra sản phẩm đầu tiên đúng tên', async ({ page }) => {
  const firstItem = page.locator('.inventory_item_name').first();
  await expect(firstItem).toHaveText('Sauce Labs Backpack');
});