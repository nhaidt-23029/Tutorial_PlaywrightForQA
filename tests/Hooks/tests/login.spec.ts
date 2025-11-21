import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// 1. Gom nhóm các test case liên quan đến Login
test.describe('Chức năng Đăng Nhập SauceDemo', () => {
  let loginPage: LoginPage;

  // 2. Chạy TRƯỚC mỗi test case (Setup)
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto(); // Luôn mở trang web trước khi test
  });

  // 3. Chạy SAU mỗi test case (Teardown/Cleanup)
  test.afterEach(async ({ page }, testInfo) => {
    console.log(`Đã chạy xong test: "${testInfo.title}" - Trạng thái: ${testInfo.status}`);
    // Ví dụ: Xóa cookies hoặc local storage nếu cần thiết cho test tiếp theo
    await page.context().clearCookies(); 
  });

  // --- TEST CASE 1: Đăng nhập thành công ---
  test('Đăng nhập thành công với tài khoản chuẩn', async ({ page }) => {
    // Hành động
    await loginPage.login('standard_user', 'secret_sauce');

    // Kiểm tra (Assert)
    // 1. URL thay đổi sang /inventory
    await expect(page).toHaveURL(/.*inventory.html/);
    
    // 2. Tiêu đề trang là "Products"
    await expect(loginPage.pageTitle).toHaveText('Products');
  });

  // --- TEST CASE 2: Đăng nhập thất bại ---
  test('Đăng nhập thất bại và hiển thị lỗi', async ({ page }) => {
    // Hành động
    await loginPage.login('standard_user', 'sai_mat_khau');

    // Kiểm tra (Assert)
    // 1. Thông báo lỗi phải hiện ra
    await expect(loginPage.errorMessage).toBeVisible();

    // 2. Nội dung lỗi chứa "Epic sadface"
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Epic sadface');
  });
});