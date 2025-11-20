import { test, expect } from '@playwright/test';

test('TodoMVC - thêm, hoàn thành và xóa task', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/');

  // Thêm task mới
  await page.locator('.new-todo').fill('Học Playwright');
  await page.locator('.new-todo').press('Enter');

  // Expect: Task được thêm thành công
  await expect(page.locator('.todo-list li label')).toHaveText('Học Playwright');

  // Đánh dấu hoàn thành
  await page.locator('.toggle').click();

  // Xóa task
  await page.locator('.destroy').click();

  // Expect: Task bị xóa thành công (list không còn task)
  await expect(page.locator('.todo-list li')).toHaveCount(0);
});