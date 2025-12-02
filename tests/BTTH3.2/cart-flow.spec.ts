import { test, expect } from '@playwright/test';

test('Thêm sản phẩm vào giỏ hàng', async ({ page }) => {
  await page.goto('/inventory.html');

  // CHỜ TRANG LOAD XONG
  await expect(page).toHaveURL(/inventory/);
  await page.waitForSelector('.inventory_item');

  const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');

  await addButton.click();

  const badge = page.locator('.shopping_cart_badge');
  await expect(badge).toHaveText('1');
});

test('Hiển thị giỏ hàng có sản phẩm vừa thêm', async ({ page }) => {
  await page.goto('/inventory.html');

  await expect(page).toHaveURL(/inventory/);
  await page.waitForSelector('.inventory_item');

  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

  // MỞ GIỎ HÀNG
  const cartButton = page.locator('.shopping_cart_link');
  await cartButton.waitFor({ state: 'visible' });
  await cartButton.click();

  const cartItem = page.locator('.cart_item .inventory_item_name');
  await expect(cartItem.first()).toBeVisible();
});