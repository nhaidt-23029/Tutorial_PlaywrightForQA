import { test, expect } from '../../fixtures';

test('Kiểm tra số lượng giỏ hàng khi thêm sản phẩm', async ({ loginPage }) => {
  const page = loginPage;

  // Thêm sản phẩm đầu tiên
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  const cartBadge = page.locator('.shopping_cart_badge');
  await expect(cartBadge).toHaveText('1');

  // Thêm sản phẩm thứ hai
  await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');

  await expect(cartBadge).toHaveText('2');
});