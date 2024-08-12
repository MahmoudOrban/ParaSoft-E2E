import { Page } from '@playwright/test';

export class RegistrationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/parabank/register.htm');
  }

  async register(userDetails: {
    firstName: string,
    lastName: string,
    street: string,
    city: string,
    state: string,
    zip: string,
    phone: string,
    ssn: string,
    username: string,
    password: string
  }) {
    await this.page.fill('input[name="customer.firstName"]', userDetails.firstName);
    await this.page.fill('input[name="customer.lastName"]', userDetails.lastName);
    await this.page.fill('input[name="customer.address.street"]', userDetails.street);
    await this.page.fill('input[name="customer.address.city"]', userDetails.city);
    await this.page.fill('input[name="customer.address.state"]', userDetails.state);
    await this.page.fill('input[name="customer.address.zipCode"]', userDetails.zip);
    await this.page.fill('input[name="customer.phoneNumber"]', userDetails.phone);
    await this.page.fill('input[name="customer.ssn"]', userDetails.ssn);
    await this.page.fill('input[name="customer.username"]', userDetails.username);
    await this.page.fill('input[name="customer.password"]', userDetails.password);
    await this.page.fill('input[name="repeatedPassword"]', userDetails.password);
    await this.page.click('input[value="Register"]');
  }
}
