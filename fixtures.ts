import { test as base, expect } from '@playwright/test';

export const test = base.extend({

  // Fixture login — trả về page đã login sẵn
  loginPage: async ({ page }, use) => {

    // Mở trang login
    await page.goto('https://www.saucedemo.com/');

    // Login bằng standard_user
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    // Kiểm tra login thành công
    await expect(page).toHaveURL(/inventory/);

    // Trả page ra cho test sử dụng
    await use(page);
  }

});

// Xuất expect để import trong test
export { expect };