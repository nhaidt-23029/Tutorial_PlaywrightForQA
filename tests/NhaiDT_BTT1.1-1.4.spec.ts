import { test, expect } from '@playwright/test';

test('Đăng ký thành công và login lại trên GlobalSQA AngularJS demo', async ({ page }) => {
  const baseUrl = 'https://www.globalsqa.com/angularJs-protractor/registration-login-example/#';

  await page.goto(`${baseUrl}/register`);

  // Verify page title
  await expect(page.locator('h2')).toHaveText('Register');

  // Correct selectors using ng-model
  const firstNameInput = page.locator('input[ng-model="vm.user.firstName"]');
  const lastNameInput = page.locator('input[ng-model="vm.user.lastName"]');
  const usernameInput = page.locator('input[ng-model="vm.user.username"]');
  const passwordInput = page.locator('input[ng-model="vm.user.password"]');

  await firstNameInput.fill('Test');
  await lastNameInput.fill('User');
  
  const username = `user${Date.now()}`;
  const password = 'Password123';

  await usernameInput.fill(username);
  await passwordInput.fill(password);

  // Button Register now enabled
  await page.click('button[type="submit"]');

  // Redirect to login
  await page.waitForURL(`${baseUrl}/login`);

  // Login page inputs
  const loginUser = page.locator('input[ng-model="vm.username"]');
  const loginPass = page.locator('input[ng-model="vm.password"]');

  await loginUser.fill(username);
  await loginPass.fill(password);

  // Click Login
  await page.click('button[type="submit"]');

  // Verify login success
  await expect(page.locator('h1')).toContainText('Hi');
});