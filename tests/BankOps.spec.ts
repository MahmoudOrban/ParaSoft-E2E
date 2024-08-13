import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/Login.page';
import { RegistrationPage } from '../POM/Registeration.page';
import { AccountOverviewPage } from '../POM/accountOverview.page';
import { TransferFundsPage } from '../POM/transferFunds.page';
import { BillPayPage } from '../POM/billPay.page';


let username:string; // Variable to store the generated username

// Generate Dynamic User Name
function generateRandomUsername() {
  return `user_${Math.floor(Math.random() * 10000)}`;
}

test.describe('ParaBank POM Test Cases', () => {

  test('User Registration', async ({ page }) => {
    username = generateRandomUsername(); 
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
    //username = generateRandomUsername(); 
    await registrationPage.register({
      firstName: 'Test',
      lastName: 'Doe',
      street: '123 Test St',
      city: 'Springfield',
      state: 'CA',
      zip: '12345',
      phone: '5555555555',
      ssn: '123-45-6789',
      username: username,
      password: 'Password123'
    });

    

     // Assertion: Check if the heading contains "Welcome" + the generated username
  const headingText = await page.locator('h1').textContent();
  expect(headingText).toBe(`Welcome ${username}`);
  });

  test('User Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, 'Password123');
      // Assertion: Check if the heading contains "Welcome" + the generated username
  const headingText = await page.locator('#showOverview h1').textContent();
  expect(headingText?.trim()).toBe(`Accounts Overview`);
  });

  test('Check Account Balance', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountOverviewPage = new AccountOverviewPage(page);

    await loginPage.goto();
    await loginPage.login(username, 'Password123');
    const balance = await accountOverviewPage.getAccountBalance();

    expect(parseFloat(balance || '')).toBeGreaterThan(0);
  });

  test('Transfer Funds', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const transferFundsPage = new TransferFundsPage(page);

    await loginPage.goto();
    await loginPage.login(username, 'Password123');
    await transferFundsPage.transferFunds('100', '12345', '67890');

    const message = await transferFundsPage.getTransferConfirmationMessage();
    expect(message).toContain('successfully transferred');
  });

  test('Bill Payment', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const billPayPage = new BillPayPage(page);

    await loginPage.goto();
    await loginPage.login(username, 'Password123');
    await billPayPage.payBill({
      payeeName: 'Test Company',
      street: '456 Elm St',
      city: 'cairo',
      state: 'CA',
      zip: '12345',
      phone: '05557654321',
      accountNumber: '987654321',
      amount: '75',
      fromAccountId: '12345'
    });

    const confirmation = await billPayPage.getPaymentConfirmation();
    expect(confirmation).toContain('Bill Payment Complete');
  });

});
