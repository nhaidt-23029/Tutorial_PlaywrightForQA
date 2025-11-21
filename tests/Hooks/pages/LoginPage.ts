import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly pageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    // Định nghĩa Locator theo data-test attribute (Best practice trên SauceDemo)
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.pageTitle = page.locator('.title');
  }

  // Hành động: Truy cập trang
  async goto() {
    await this.page.goto('https://www.saucedemo.com');
  }

  // Hành động: Đăng nhập
  async login(username: string, pass: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
  
  // Helper: Lấy nội dung lỗi
  async getErrorMessageText() {
    return await this.errorMessage.innerText();
  }
}