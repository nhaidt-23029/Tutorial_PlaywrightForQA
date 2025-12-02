import { test, expect } from '../../fixtures';

test('Login và Logout', async ({ loginPage }) => {
  const page = loginPage;

  // TẮT ANIMATION ĐỂ FIREFOX HOẠT ĐỘNG ỔN ĐỊNH
  await page.addStyleTag({ content: `
    .bm-menu {
      transition: none !important;
      transform: translate3d(0px, 0px, 0px) !important;
    }
  `});

  // MỞ MENU
  await page.click('#react-burger-menu-btn');

  // CHỜ NÚT LOGOUT HIỆN
  const logoutButton = page.locator('#logout_sidebar_link');
  await logoutButton.waitFor({ state: 'visible', timeout: 5000 });

  await logoutButton.click();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
});