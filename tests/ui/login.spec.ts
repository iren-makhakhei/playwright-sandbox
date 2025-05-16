import { test, expect } from '@playwright/test';
import { env } from 'process';
import { LoginPage } from '../../pages/LoginPage';
import { ShopPage } from '../../pages/ShopPage';

let loginPage: LoginPage;
let shopPage: ShopPage;

test.describe.parallel('Sample Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    shopPage = new ShopPage(page);
    await page.goto('https://www.saucedemo.com/');
    
  });

  test('Postive Login Scenario', async ({ page }) => {
    await loginPage.login(env.SAUCEUIUSER as string, env.SAUCEUIPASSWORD as string);
    expect(await shopPage.assertShoppingCartIconVisible()).toBeTruthy();
  });

  test('Negative Login Scenario', async ({ page }) => {
    await loginPage.login('invalid_user', 'invalid_password');
    const errorMessage = await loginPage.getLoginErrorMessage();
    expect(errorMessage).toContain('Epic sadface: Username and password do not match any user in this service');
  });
});