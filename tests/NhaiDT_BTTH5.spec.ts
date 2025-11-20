import { test, expect } from '@playwright/test';

test('Thao tác với Todo List trên Playwright Demo', async ({ page }) => {
  // --- 1. Truy cập trang ---
  await page.goto('https://demo.playwright.dev/todomvc');

  // --- 2. Thêm 3 công việc: Task A, Task B, Task C ---
  // Định vị ô input để nhập liệu
  const todoInput = page.locator('.new-todo');
  
  const tasks = ['Task A', 'Task B', 'Task C'];
  for (const task of tasks) {
    await todoInput.fill(task);
    await todoInput.press('Enter');
  }

  // --- 3. Tick chọn công việc thứ 2 (dùng .nth(1)) ---
  // Lưu ý: nth bắt đầu từ 0, nên thứ 2 là index 1
  await page.locator('.toggle').nth(1).check();

  // --- 4. Kiểm tra task đầu tiên là Task A (dùng .first()) ---
  // Lấy danh sách các nhãn (label) hiển thị tên task
  const firstTaskLabel = page.locator('.view label').first();
  await expect(firstTaskLabel).toHaveText('Task A');

  // --- 5. Dùng .filter() để chọn task "Task C" và xóa nó ---
  // Bước 1: Tìm thẻ <li> chứa text "Task C"
  const taskCRow = page.locator('li').filter({ hasText: 'Task C' });
  
  // Bước 2: Hover vào dòng đó để nút Xóa (destroy) hiện ra
  await taskCRow.hover();
  
  // Bước 3: Tìm nút xóa (.destroy) nằm BÊN TRONG dòng task C và click
  await taskCRow.locator('.destroy').click();

  // Verification phụ: Đảm bảo Task C đã biến mất
  await expect(page.locator('li').filter({ hasText: 'Task C' })).not.toBeVisible();
});