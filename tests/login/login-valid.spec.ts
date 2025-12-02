import { test, expect } from '../../fixtures';

test('standard_user login thành công', async ({ loginPage }) => {
  // Page đã login từ fixture
  await expect(loginPage.locator('.inventory_list')).toBeVisible();
});