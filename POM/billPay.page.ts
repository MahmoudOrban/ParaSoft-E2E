import { Page } from '@playwright/test';

export class BillPayPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async payBill(billDetails: {
    payeeName: string,
    street: string,
    city: string,
    state: string,
    zip: string,
    phone: string,
    accountNumber: string,
    amount: string,
    fromAccountId: string
  }) {
    await this.page.click('text=Bill Pay');
    await this.page.fill('input[name="payee.name"]', billDetails.payeeName);
    await this.page.fill('input[name="payee.address.street"]', billDetails.street);
    await this.page.fill('input[name="payee.address.city"]', billDetails.city);
    await this.page.fill('input[name="payee.address.state"]', billDetails.state);
    await this.page.fill('input[name="payee.address.zipCode"]', billDetails.zip);
    await this.page.fill('input[name="payee.phoneNumber"]', billDetails.phone);
    await this.page.fill('input[name="payee.accountNumber"]', billDetails.accountNumber);
    await this.page.fill('input[name="verifyAccount"]', billDetails.accountNumber);
    await this.page.fill('input[name="amount"]', billDetails.amount);
    await this.page.selectOption('select[name="fromAccountId"]', billDetails.fromAccountId);
    await this.page.click('input[value="Send Payment"]');
  }

  async getPaymentConfirmation(): Promise<string | null> {
    return this.page.textContent('.title');
  }
}
