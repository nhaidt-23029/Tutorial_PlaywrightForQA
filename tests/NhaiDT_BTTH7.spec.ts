import { test, expect } from '@playwright/test';

// 1. Cấu hình ghi video cho TẤT CẢ các test trong file này (kể cả Pass)
test.use({ video: 'on' });

test('Login thành công và chụp ảnh báo cáo', async ({ page }, testInfo) => {
  // --- Setup: Tạo tên thư mục dựa trên tên Test Case ---
  // Loại bỏ các ký tự đặc biệt và khoảng trắng để tránh lỗi tên file
  const folderName = testInfo.title.replace(/[^a-z0-9]/gi, '_');
  
  await page.goto('https://www.saucedemo.com');

  // Nhập liệu (chưa click)
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');

  // --- 2. Chụp ảnh TRƯỚC khi Login ---
  // Path: screenshots/Tên_Test/before_login.png
  const screenshotPathBefore = `screenshots/${folderName}/before_login.png`;
  
  await page.screenshot({ path: screenshotPathBefore });
  
  // (Tùy chọn) Đính kèm ảnh vào report thủ công để hiển thị rõ hơn
  await testInfo.attach('Anh truoc khi Login', {
    path: screenshotPathBefore,
    contentType: 'image/png',
  });

  // Thực hiện Click Login
  await page.locator('[data-test="login-button"]').click();

  // Kiểm tra đăng nhập thành công (URL thay đổi hoặc có chữ Products)
  await expect(page.locator('.title')).toHaveText('Products');

  // --- 3. Chụp ảnh SAU khi Login ---
  const screenshotPathAfter = `screenshots/${folderName}/after_login.png`;
  
  await page.screenshot({ path: screenshotPathAfter });

  await testInfo.attach('Anh sau khi Login', {
    path: screenshotPathAfter,
    contentType: 'image/png',
  });
});