import { test, expect } from '@playwright/test';

test.describe('Automation với Waits – Bài tập hoàn chỉnh', () => {
  const url = 'https://www.saucedemo.com';

  // ========================================================
  // TC1: KHÔNG dùng waits → test fail ngẫu nhiên (unstable)
  // ========================================================
  test('TC1 - Login không dùng waits (test có thể fail ngẫu nhiên)', async ({ page }) => {
    await page.goto(url);

    // Không đợi page load hoặc không đợi trường xuất hiện
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');

    // Click login ngay → có thể trường chưa fully rendered → FAIL random
    await page.click('#login-button');

    // Không đợi redirect → kiểm tra URL sớm → FAIL random
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  // ========================================================
  // TC2: Đợi SAI selector → Test timeout
  // ========================================================
  test('TC2 - Đợi sai selector → Test timeout', async ({ page }) => {
    await page.goto(url);

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Sai selector → Cố tình để test timeout 5s
    await expect(async () => {
      await page.waitForSelector('#productssss-title', { timeout: 5000 });
    }).rejects.toThrowError();
  });

  // ========================================================
  // TC3: Dùng waitForTimeout(5000) → KHÔNG nên dùng
  // ========================================================
  test('TC3 - Dùng waitForTimeout(5000) (Anti-pattern) – KHÔNG nên dùng', async ({ page }) => {
    await page.goto(url);

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // ❌ Chờ 5s cứng, không thông minh → làm test chậm, không ổn định
    await page.waitForTimeout(5000);  

    // Sau 5s mới verify
    const title = page.locator('.title');
    await expect(title).toHaveText('Products');
  });
});
