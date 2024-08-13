import { Page } from '@playwright/test';

export class AccountOverviewPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getAccountBalance(): Promise<string | null> {
    await this.page.click('text=Accounts Overview');
    return this.page.textContent('balance');
  }
}
