import { Page } from '@playwright/test';

export class TransferFundsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async transferFunds(amount: string, fromAccountId: string, toAccountId: string) {
    await this.page.click('text=Transfer Funds');
    await this.page.fill('input[name="amount"]', amount);
    await this.page.selectOption('select[name="fromAccountId"]', fromAccountId);
    await this.page.selectOption('select[name="toAccountId"]', toAccountId);
    await this.page.click('input[value="Transfer"]');
  }

  async getTransferConfirmationMessage(): Promise<string | null> {
    return this.page.textContent('.message');
  }
}
