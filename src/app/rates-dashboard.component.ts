import { Component } from '@angular/core';

@Component({
  selector: 'app-rates-dashboard',
  standalone: true,
  template: `
    <main class="dashboard">
      <header class="page-heading">
        <div>
          <p class="eyebrow">BUSINESS TOOLS</p>
          <h2>Material Rates</h2>
          <p class="subtitle">Online reference prices for aluminium and glass.</p>
        </div>
      </header>

      <section class="rate-grid" aria-label="Material market references">
        <article class="rate-card">
          <div class="card-heading">
            <span class="material-icon aluminium-icon" aria-hidden="true">Al</span>
            <div><p class="category">ALUMINIUM · MCX FUTURES</p><h3>Aluminium</h3></div>
          </div>
          <p class="rate-value">&#8377;324.40 <span>/ kg</span></p>
          <p class="detail">Latest quote shown for 15 Oct 2026.</p>
          <a href="https://upstox.com/commodity-market-trading/mcx-alumini-price/" target="_blank" rel="noopener noreferrer">View Upstox source ↗</a>
        </article>

        <article class="rate-card">
          <div class="card-heading">
            <span class="material-icon glass-icon" aria-hidden="true">◇</span>
            <div><p class="category">CLEAR GLASS · 4 MM</p><h3>Glass</h3></div>
          </div>
          <p class="rate-value">&#8377;59 <span>/ sq ft</span></p>
          <p class="detail">Listed online price for 4 mm clear glass.</p>
          <a href="https://glassquick.in/glass/clear-glass" target="_blank" rel="noopener noreferrer">View GlassQuick source ↗</a>
        </article>
      </section>

      <aside class="source-note">
        <span class="note-icon" aria-hidden="true">i</span>
        <p><strong>Google search snapshot · checked 19 Oct 2026.</strong> These are online reference prices, not guaranteed local supplier quotes. Aluminium futures differ from fabricated profiles; glass prices vary by type, thickness, processing, and location.</p>
      </aside>
    </main>
  `,
  styles: [`
    :host { display: block; min-height: calc(100vh - 82px); background: #f5f7f8; }
    .dashboard { max-width: 1120px; margin: 0 auto; padding: 48px 32px; color: #20343d; font-family: var(--font-system); }
    .page-heading { margin-bottom: 30px; }
    .eyebrow, .category { margin: 0 0 8px; color: #64748b; font-size: 12px; font-weight: 700; letter-spacing: .1em; }
    h2 { margin: 0; font-size: 32px; letter-spacing: -.03em; }
    .subtitle { margin: 8px 0 0; color: #64748b; font-size: 16px; }
    .rate-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
    .rate-card { min-width: 0; padding: 28px; border: 1px solid #e3e9e8; border-radius: 14px; background: white; box-shadow: 0 8px 24px #1f363b0a; }
    .card-heading { display: flex; align-items: center; gap: 14px; }
    .material-icon { width: 46px; height: 46px; display: grid; place-items: center; border-radius: 12px; font-size: 18px; font-weight: 700; }
    .aluminium-icon { background: #e0e7ff; color: #4338ca; }
    .glass-icon { background: #cffafe; color: #0e7490; font-size: 27px; }
    .category { margin-bottom: 4px; font-size: 12px; }
    h3 { margin: 0; font-size: 18px; }
    .rate-value { margin: 30px 0 5px; font-size: 38px; font-weight: 700; letter-spacing: -.04em; }
    .rate-value span { color: #64748b; font-size: 14px; font-weight: 400; letter-spacing: 0; }
    .detail { margin: 0 0 15px; color: #64748b; font-size: 15px; }
    a { color: #2563eb; font-size: 14px; font-weight: 700; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .source-note { display: flex; align-items: flex-start; gap: 12px; margin-top: 22px; padding: 18px; border: 1px solid #e2e8f0; border-radius: 12px; background: #f8fafc; }
    .note-icon { flex: 0 0 22px; width: 22px; height: 22px; display: grid; place-items: center; border-radius: 50%; background: #e2e8f0; color: #334155; font-size: 13px; font-weight: 700; }
    .source-note p { margin: 0; color: #64748b; font-size: 14px; line-height: 1.6; }
    .source-note strong { color: #334155; }
    @media (max-width: 700px) { .dashboard { padding: 30px 16px; } .rate-grid { grid-template-columns: 1fr; } h2 { font-size: 27px; } .rate-card { padding: 23px; } .rate-value { font-size: 34px; } }
  `],
})
export class RatesDashboardComponent {}
