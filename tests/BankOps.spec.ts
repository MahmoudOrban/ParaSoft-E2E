import { test, expect } from '@playwright/test';
import { LoginPage } from '../POM/Login.page';
import { RegistrationPage } from '../POM/Registeration.page';
import { AccountOverviewPage } from '../POM/accountOverview.page';
import { TransferFundsPage } from '../POM/transferFunds.page';
import { BillPayPage } from '../POM/billPay.page';

test.describe('ParaBank POM Test Cases', () => {

  test('User Registration', async ({ page }) => {
   
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.register({
      firstName: 'John',
      lastName: 'Doe',
      street: '123 Elm St',
      city: 'Springfield',
      state: 'IL',
      zip: '62704',
      phone: '5551234567',
      ssn: '123-45-6789',
      username: 'johndoe',
      password: 'Password123'
    });

    await expect(page).toHaveURL('/overview.htm');
  });

  test('User Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('johndoe', 'Password123');
    await expect(page).toHaveURL('/overview.htm');
  });

  test('Check Account Balance', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountOverviewPage = new AccountOverviewPage(page);

    await loginPage.goto();
    await loginPage.login('johndoe', 'Password123');
    const balance = await accountOverviewPage.getAccountBalance();

    expect(parseFloat(balance || '')).toBeGreaterThan(0);
  });

  test('Transfer Funds', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const transferFundsPage = new TransferFundsPage(page);

    await loginPage.goto();
    await loginPage.login('johndoe', 'Password123');
    await transferFundsPage.transferFunds('100', '12345', '67890');

    const message = await transferFundsPage.getTransferConfirmationMessage();
    expect(message).toContain('successfully transferred');
  });

  test('Bill Payment', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const billPayPage = new BillPayPage(page);

    await loginPage.goto();
    await loginPage.login('johndoe', 'Password123');
    await billPayPage.payBill({
      payeeName: 'Utility Company',
      street: '456 Elm St',
      city: 'Springfield',
      state: 'IL',
      zip: '62705',
      phone: '5557654321',
      accountNumber: '987654321',
      amount: '75',
      fromAccountId: '12345'
    });

    const confirmation = await billPayPage.getPaymentConfirmation();
    expect(confirmation).toContain('Bill Payment Complete');
  });

});
