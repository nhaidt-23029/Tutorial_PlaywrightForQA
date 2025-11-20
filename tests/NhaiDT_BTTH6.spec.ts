import { test, expect } from '@playwright/test';

// Định nghĩa bộ dữ liệu kiểm thử (Data Driven Testing)
const invalidCredentials = [
  { user: 'standard_user', pass: 'wrong_password', error: 'Username and password do not match' },
  { user: 'wrong_user', pass: 'secret_sauce', error: 'Username and password do not match' },
  { user: 'locked_out_user', pass: 'secret_sauce', error: 'Sorry, this user has been locked out' }
];

test.describe('Invalid Login Scenarios @login', () => {

  // 1. Setup chung: Chạy trước MỖI test case trong nhóm describe này
  test.beforeEach(async ({ page }) => {
    // Truy cập trang trước khi bắt đầu nhập liệu
    await page.goto('https://www.saucedemo.com');
  });

  // 2. Tạo Dynamic Test: Dùng vòng lặp để chạy qua mảng dữ liệu
  for (const data of invalidCredentials) {
    test(`Đăng nhập thất bại với User: ${data.user} và Pass: ${data.pass}`, async ({ page }) => {
      // Nhập Username
      await page.locator('[data-test="username"]').fill(data.user);
      
      // Nhập Password
      await page.locator('[data-test="password"]').fill(data.pass);
      
      // Click nút Login
      await page.locator('[data-test="login-button"]').click();

      // Kiểm tra thông báo lỗi hiển thị
      const errorMsg = page.locator('[data-test="error"]');
      await expect(errorMsg).toBeVisible();
      await expect(errorMsg).toContainText(data.error);
    });
  }

  // 3. Minh họa test.skip(): Test case này sẽ bị bỏ qua, không chạy
  test.skip('Test case chưa hoàn thiện (Demo Skip)', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('');
    await page.locator('[data-test="password"]').fill('');
    await page.locator('[data-test="login-button"]').click();
    // Test này sẽ được đánh dấu là Skipped trong báo cáo
  });

  /* 4. Minh họa test.only(): 
   Nếu bỏ comment dòng dưới, Playwright sẽ CHỈ chạy duy nhất test này, bỏ qua tất cả các test trên.
   Dùng khi bạn đang debug một lỗi cụ thể.
  */
  // test.only('Test case chạy độc lập (Demo Only)', async ({ page }) => {
  //   await page.locator('[data-test="username"]').fill('standard_user');
  //   await page.locator('[data-test="password"]').fill('123456');
  //   await page.locator('[data-test="login-button"]').click();
  //   await expect(page.locator('[data-test="error"]')).toBeVisible();
  // });

});