import { Page } from '@playwright/test';

export class DashboardPage {
  readonly dashboardHeading = this.page.getByRole('heading', { name: 'Dashboard' });

  constructor(private readonly page: Page) {}
}
