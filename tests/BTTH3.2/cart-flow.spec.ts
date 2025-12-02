import { test, expect } from '@playwright/test';

// Dùng login đã lưu trong auth.json
test.use({ storageState: 'auth.json' });

// Tăng timeout cho test (nếu trang load chậm)
test.setTimeout(60000);

test('Thêm sản phẩm vào giỏ hàng', async ({ page }) => {
  // Đi tới trang inventory
  await page.goto('/inventory.html');

  // Chọn button "Add to cart"
  const addButton = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');

  // Chờ button hiển thị trước khi click
  await addButton.waitFor({ state: 'visible', timeout: 10000 });
  await addButton.click();

  // Kiểm tra badge giỏ hàng = 1
  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');
});

test('Hiển thị giỏ hàng có sản phẩm vừa thêm', async ({ page }) => {
  // Đi tới trang inventory
  await page.goto('/inventory.html');

  // Thêm sản phẩm nếu chưa có
  const addButton = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
  if (await addButton.isVisible()) {
    await addButton.click();
  }

  // Mở giỏ hàng
  await page.locator('.shopping_cart_link').click();

  // Kiểm tra sản phẩm có trong giỏ hàng
  const cartItem = page.locator('.cart_item .inventory_item_name');
  await expect(cartItem).toHaveText('Sauce Labs Backpack');
});