import { Component } from '@angular/core';
import { InvoiceComponent } from './invoice.component';
import { RatesDashboardComponent } from './rates-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InvoiceComponent, RatesDashboardComponent],
  template: `
    <div class="app-shell">
      <header class="site-header">
        <h1 (click)="page = 'landing'" (keydown.enter)="page = 'landing'" tabindex="0">Shantanu Glass &amp; Aluminum</h1>
        @if (page !== 'landing') {
          <button class="back-button" (click)="page = 'landing'">← Back to Home</button>
        }
      </header>
      <main>
        @if (page === 'landing') {
          <section class="landing">
            <h2>Welcome to Business Portal</h2>
            <p class="intro">Manage your business glass and aluminum quotes efficiently.</p>
            <div class="module-cards">
              <article class="module-card">
                <h3>Invoice Generator</h3>
                <p>Create professional bills and quotations for your clients.</p>
                <button class="primary-button" (click)="page = 'invoice'">Open Generator</button>
              </article>
              <article class="module-card coming-soon">
                <h3>Client History</h3>
                <p>View your past invoices and client records.</p>
                <button disabled>Coming Soon</button>
              </article>
              <article class="module-card">
                <h3>Rates Dashboard</h3>
                <p>Keep your current aluminium and glass quote rates in one place.</p>
                <button class="primary-button" (click)="page = 'rates'">View Rates</button>
              </article>
            </div>
          </section>
        } @else if (page === 'invoice') {
          <app-invoice />
        } @else {
          <app-rates-dashboard />
        }
      </main>
    </div>
  `,
  styles: [`
    .app-shell { min-height: 100vh; background: #f1f5f9; }
    .site-header { width: 100%; padding: 15px 30px; background: #0f172a; color: white; display: flex; align-items: center; justify-content: space-between; box-sizing: border-box; box-shadow: 0 2px 4px #0002; }
    .site-header h1 { margin: 0; font-size: 20px; cursor: pointer; }
    button { border: 0; border-radius: 6px; cursor: pointer; font-weight: 700; }
    .back-button { padding: 8px 16px; background: #334155; color: white; font-size: 14px; }
    .landing { padding: 40px; text-align: center; font-family: Arial, sans-serif; }
    .landing h2 { margin-top: 0; font-size: 40px; color: #0f172a; }
    .intro { margin-bottom: 40px; font-size: 18px; color: #64748b; }
    .module-cards { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; }
    .module-card { width: 300px; padding: 30px; border: 1px solid #e2e8f0; border-radius: 12px; background: white; box-shadow: 0 4px 6px -1px #0002; }
    .module-card h3 { color: #1e293b; }
    .module-card p { color: #64748b; }
    .primary-button { padding: 12px 24px; background: #0f172a; color: white; }
    .coming-soon { background: #f8fafc; }
    .coming-soon button { padding: 12px 24px; background: #cbd5e1; color: #64748b; cursor: not-allowed; }
    @media (max-width: 600px) { .landing { padding: 28px 16px; } .landing h2 { font-size: 32px; } .site-header { padding: 14px 16px; } }
  `],
})
export class AppComponent {
  page: 'landing' | 'invoice' | 'rates' = 'landing';
}
