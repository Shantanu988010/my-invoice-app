import { Component } from '@angular/core';
import { InvoiceComponent } from './invoice.component';
import { RatesDashboardComponent } from './rates-dashboard.component';
import { QuotationFromPhotoComponent } from './quotation-from-photo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InvoiceComponent, RatesDashboardComponent, QuotationFromPhotoComponent],
  template: `
    <div class="app-shell" [class.dark-theme]="isDarkMode">
      <header class="site-header">
        <button class="brand" (click)="page = 'landing'" aria-label="Go to home">
          <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
          <span class="brand-copy"><strong>Shantanu</strong><span>GLASS &amp; ALUMINIUM</span></span>
        </button>

        <nav class="main-nav" aria-label="Main navigation">
          <button class="nav-link" [class.active]="page === 'landing'" (click)="page = 'landing'">Home</button>
          <button class="nav-link" [class.active]="page === 'rates'" (click)="page = 'rates'">Material rates</button>
          <button class="nav-link" [class.active]="page === 'photo-quote'" (click)="page = 'photo-quote'">Photo to quote</button>
          <button class="theme-toggle" (click)="toggleTheme()" [attr.aria-label]="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"><span aria-hidden="true">{{ isDarkMode ? '☀' : '☾' }}</span>{{ isDarkMode ? 'Light mode' : 'Dark mode' }}</button>
          <button class="nav-action" [class.active]="page === 'invoice'" (click)="page = 'invoice'"><span aria-hidden="true">＋</span> New invoice</button>
        </nav>
      </header>

      <main>
        @if (page === 'landing') {
          <div class="home-page">
            <section class="hero">
              <div class="hero-copy">
                <p class="eyebrow"><span></span> GLASS &amp; ALUMINIUM WORKSPACE</p>
                <h1>Good work deserves a <em>clear</em> quotation.</h1>
                <p class="hero-description">Create polished client invoices, keep material references close, and spend more time on the work that matters.</p>
                <div class="hero-actions">
                  <button class="primary-action" (click)="page = 'invoice'">Create an invoice <span aria-hidden="true">→</span></button>
                  <button class="text-action" (click)="page = 'rates'">Explore material rates <span aria-hidden="true">↗</span></button>
                </div>
                <div class="hero-caption"><span class="caption-line"></span><span>Built for Shantanu Glass &amp; Aluminum</span></div>
              </div>

              <div class="hero-art" aria-label="Decorative illustration of glass and aluminium window frames" role="img">
                <div class="art-topline"><span>CRAFTED WITH CLARITY</span><span>SG / 01</span></div>
                <div class="window-illustration"><div class="pane pane-one"></div><div class="pane pane-two"></div><div class="pane pane-three"></div><div class="pane pane-four"></div><div class="frame-horizontal"></div><div class="frame-vertical"></div></div>
                <div class="art-label"><span class="art-dot"></span><span>Precision in every detail</span></div>
                <div class="art-watermark" aria-hidden="true">SG</div>
              </div>
            </section>

            <section class="workspace-section">
              <div class="section-title">
                <div><p class="eyebrow section-eyebrow">YOUR WORKSPACE</p><h2>Everything you need to get started.</h2></div>
                <p>Practical tools for clear, confident client communication.</p>
              </div>

              <div class="tool-grid">
                <article class="tool-card invoice-card">
                  <div class="tool-icon invoice-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M7 3.75h7l4 4v12.5H7a2 2 0 0 1-2-2v-12.5a2 2 0 0 1 2-2Z"/><path d="M14 3.75v4h4M8.5 12h7M8.5 15.5h7"/></svg></div>
                  <div class="tool-tag">CLIENT DOCUMENTS</div>
                  <h3>Invoice generator</h3>
                  <p>Build a detailed quotation, adjust line items, and download a client-ready PDF.</p>
                  <button class="card-link" (click)="page = 'invoice'">Open invoice workspace <span aria-hidden="true">→</span></button>
                </article>

                <article class="tool-card rates-card">
                  <div class="tool-icon rates-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 19.25h16M6.5 16V9.5M12 16V5.75M17.5 16v-4"/><circle cx="6.5" cy="7" r="1.4"/><circle cx="12" cy="3.5" r="1.4"/><circle cx="17.5" cy="9.5" r="1.4"/></svg></div>
                  <div class="tool-tag">MATERIAL REFERENCES</div>
                  <h3>Rates dashboard</h3>
                  <p>Review online aluminium and clear glass price references with their sources.</p>
                  <button class="card-link" (click)="page = 'rates'">View material rates <span aria-hidden="true">→</span></button>
                </article>

                <article class="tool-card photo-card">
                  <div class="tool-icon photo-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 6.5h3l1.5-2h7l1.5 2h3a1.5 1.5 0 0 1 1.5 1.5v10a1.5 1.5 0 0 1-1.5 1.5h-16A1.5 1.5 0 0 1 3.5 18V8A1.5 1.5 0 0 1 5 6.5Z"/><circle cx="12" cy="12.5" r="3.5"/><path d="m8.5 17 2.2-2.2 1.8 1.8 1.2-1.2 2.3 2.1"/></svg></div>
                  <div class="tool-tag">GEMINI AI</div>
                  <h3>Photo to quotation</h3>
                  <p>Turn a handwritten quotation into an editable document and client-ready PDF.</p>
                  <button class="card-link" (click)="page = 'photo-quote'">Transcribe a quotation <span aria-hidden="true">→</span></button>
                </article>

                <article class="tool-card upcoming-card">
                  <div class="tool-icon history-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4.5 8.5A8 8 0 1 1 4 13M4.5 4.75v3.8h3.8M12 7.5v5l3 1.75"/></svg></div>
                  <div class="tool-tag">COMING SOON</div>
                  <h3>Client history</h3>
                  <p>Keep past invoices and client details easy to find in one place.</p>
                  <span class="coming-label"><span></span> In development</span>
                </article>
              </div>
            </section>

            <footer class="home-footer"><span>Shantanu Glass &amp; Aluminum</span><span>Thoughtful tools for quality work.</span></footer>
          </div>
        } @else if (page === 'invoice') {
          <app-invoice />
        } @else if (page === 'photo-quote') {
          <app-quotation-from-photo />
        } @else {
          <app-rates-dashboard />
        }
      </main>
    </div>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; color: #162536; font-family: var(--font-system); }
    .app-shell { min-height: 100vh; background: #f5f7f8; }
    .site-header { position: relative; z-index: 5; display: flex; align-items: center; justify-content: space-between; max-width: 1440px; margin: 0 auto; padding: 0 6.1%; height: 82px; background: #f5f7f8; }
    .brand { display: inline-flex; align-items: center; gap: 12px; padding: 0; border: 0; background: transparent; color: #152537; text-align: left; cursor: pointer; }
    .brand-mark { position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 2px; width: 38px; height: 38px; padding: 5px; border-radius: 10px; background: #123b43; transform: rotate(-3deg); }
    .brand-mark i { display: block; border: 1px solid #8bd1cc; border-radius: 2px; background: #267f7b; }
    .brand-mark i:nth-child(2), .brand-mark i:nth-child(3) { background: #15555b; }
    .brand-copy { display: grid; gap: 2px; }
    .brand-copy strong { font-family: var(--font-display); font-size: 18px; font-weight: 600; letter-spacing: -.02em; }
    .brand-copy span { color: #70818a; font-size: 10px; font-weight: 700; letter-spacing: .16em; }
    .main-nav { display: flex; align-items: center; gap: 10px; }
    .nav-link, .nav-action { min-height: 42px; padding: 0 14px; border: 0; border-radius: 8px; background: transparent; color: #687780; cursor: pointer; font: inherit; font-size: 14px; font-weight: 600; transition: color .15s, background .15s; }
    .nav-link:hover, .nav-link.active { color: #174e52; background: #e8f0ef; }
    .theme-toggle { display: inline-flex; align-items: center; justify-content: center; gap: 7px; min-height: 40px; padding: 0 12px; border: 1px solid #dce5e4; border-radius: 8px; background: #fff; color: #43565d; cursor: pointer; font: inherit; font-size: 13px; font-weight: 650; transition: background .15s, border-color .15s, color .15s; }
    .theme-toggle:hover { border-color: #80a9a4; color: #174e52; }
    .theme-toggle span { color: #43827d; font-size: 17px; line-height: 1; }
    .nav-action { margin-left: 8px; padding: 0 17px; background: #173f45; color: #fff; box-shadow: 0 4px 10px #173f4520; }
    .nav-action:hover, .nav-action.active { background: #0d3036; }
    .nav-action span { padding-right: 4px; font-size: 17px; vertical-align: -1px; }
    .home-page { max-width: 1440px; margin: 0 auto; padding: 17px 6.1% 0; }
    .hero { position: relative; display: grid; grid-template-columns: 1.02fr .98fr; min-height: 434px; overflow: hidden; border: 1px solid #e3e9e8; border-radius: 16px; background: #fff; box-shadow: 0 14px 42px #1f363b0b; }
    .hero-copy { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: flex-start; justify-content: center; padding: 54px clamp(30px, 5vw, 74px); }
    .eyebrow { display: flex; align-items: center; gap: 9px; margin: 0 0 21px; color: #47827f; font-size: 11px; font-weight: 800; letter-spacing: .14em; }
    .eyebrow > span { width: 7px; height: 7px; border-radius: 50%; background: #51a79f; box-shadow: 0 0 0 4px #51a79f1c; }
    .hero h1 { max-width: 520px; margin: 0; color: #1c2d3a; font-family: var(--font-display); font-size: clamp(38px, 4.1vw, 58px); font-weight: 500; letter-spacing: -.045em; line-height: 1.08; }
    .hero h1 em { color: #2c8983; font-weight: 500; }
    .hero-description { max-width: 450px; margin: 18px 0 0; color: #6a7a83; font-size: 16px; line-height: 1.7; }
    .hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 20px; margin-top: 28px; }
    .primary-action { display: inline-flex; align-items: center; gap: 20px; padding: 14px 18px; border: 0; border-radius: 7px; background: #17484b; color: #fff; cursor: pointer; font: inherit; font-size: 14px; font-weight: 700; box-shadow: 0 5px 12px #17484b24; transition: transform .15s, background .15s; }
    .primary-action:hover { transform: translateY(-1px); background: #10393c; }
    .primary-action span, .text-action span { font-size: 17px; font-weight: 400; }
    .text-action { display: inline-flex; align-items: center; gap: 8px; padding: 8px 0; border: 0; background: transparent; color: #427c79; cursor: pointer; font: inherit; font-size: 14px; font-weight: 700; }
    .hero-caption { display: flex; align-items: center; gap: 9px; margin-top: 40px; color: #87959a; font-size: 12px; letter-spacing: .015em; }
    .caption-line { display: inline-block; width: 23px; height: 1px; background: #91b5b0; }
    .hero-art { position: relative; display: flex; align-items: center; justify-content: center; min-height: 434px; overflow: hidden; background: linear-gradient(145deg, #e7f0ed 0%, #dce9e5 46%, #cfdfda 100%); }
    .hero-art::before, .hero-art::after { position: absolute; content: ""; border: 1px solid #fff9; border-radius: 50%; }
    .hero-art::before { width: 510px; height: 510px; right: -154px; top: -234px; }
    .hero-art::after { width: 410px; height: 410px; left: -270px; bottom: -290px; }
    .art-topline { position: absolute; top: 25px; right: 27px; left: 27px; display: flex; justify-content: space-between; color: #77918e; font-size: 10px; font-weight: 700; letter-spacing: .12em; }
    .window-illustration { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; width: min(54%, 258px); aspect-ratio: .76; padding: 10px; border: 7px solid #24464a; border-radius: 3px; background: #b1cbc6; box-shadow: 18px 21px 0 #1c414326, 0 28px 50px #14393a29; transform: perspective(700px) rotateY(-10deg) rotateZ(1deg); }
    .pane { border: 4px solid #355d5c; background: linear-gradient(145deg, #d8ebe7aa, #80aaa399 61%, #e1eeebaa); }
    .pane-one { background: linear-gradient(135deg, #d4e8e5, #afccc7); }
    .pane-two { background: linear-gradient(215deg, #c1dbd6, #89b3ae); }
    .pane-three { background: linear-gradient(35deg, #a4c7c1, #d0e2de); }
    .pane-four { background: linear-gradient(225deg, #bad5d0, #94b9b4); }
    .frame-horizontal, .frame-vertical { position: absolute; z-index: 2; background: #24464a; }
    .frame-horizontal { top: 50%; right: 7px; left: 7px; height: 8px; transform: translateY(-50%); }
    .frame-vertical { top: 7px; bottom: 7px; left: 50%; width: 8px; transform: translateX(-50%); }
    .art-label { position: absolute; z-index: 2; right: 28px; bottom: 26px; display: flex; align-items: center; gap: 8px; color: #53716e; font-size: 12px; font-weight: 600; }
    .art-dot { width: 6px; height: 6px; border-radius: 50%; background: #438e85; }
    .art-watermark { position: absolute; right: 27px; bottom: 51px; color: #fff6; font-family: var(--font-display); font-size: 54px; letter-spacing: -.08em; }
    .workspace-section { padding: 55px 0 32px; }
    .section-title { display: flex; align-items: flex-end; justify-content: space-between; gap: 30px; margin-bottom: 21px; }
    .section-eyebrow { margin-bottom: 8px; font-size: 11px; }
    .section-title h2 { margin: 0; color: #263844; font-family: var(--font-display); font-size: 27px; font-weight: 500; letter-spacing: -.03em; }
    .section-title > p { max-width: 290px; margin: 0 0 3px; color: #7b898e; font-size: 13px; line-height: 1.6; }
    .tool-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 15px; }
    .tool-card { position: relative; display: flex; min-height: 228px; flex-direction: column; align-items: flex-start; padding: 21px 22px 18px; border: 1px solid #e3e9e8; border-radius: 11px; background: #fff; box-shadow: 0 5px 18px #1f363b08; transition: transform .16s, box-shadow .16s; }
    .tool-card:hover { transform: translateY(-2px); box-shadow: 0 12px 24px #1f363b12; }
    .tool-icon { display: grid; width: 37px; height: 37px; place-items: center; margin-bottom: 16px; border-radius: 9px; }
    .tool-icon svg { width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.55; }
    .invoice-icon { background: #e7f0ed; color: #347a73; }
    .rates-icon { background: #eef0f8; color: #5c6c9a; }
    .history-icon { background: #f5efe5; color: #a1804c; }
    .photo-icon { background: #f3eaf7; color: #885c9a; }
    .tool-tag { margin-bottom: 7px; color: #829196; font-size: 11px; font-weight: 800; letter-spacing: .1em; }
    .tool-card h3 { margin: 0; color: #293b45; font-family: var(--font-display); font-size: 19px; font-weight: 500; }
    .tool-card > p { margin: 8px 0 16px; color: #77868b; font-size: 14px; line-height: 1.6; }
    .card-link { display: inline-flex; align-items: center; gap: 10px; margin-top: auto; padding: 0; border: 0; background: transparent; color: #327b76; cursor: pointer; font: inherit; font-size: 13px; font-weight: 700; }
    .card-link span { font-size: 16px; transition: transform .15s; }
    .card-link:hover span { transform: translateX(3px); }
    .upcoming-card { background: #fbfaf7; }
    .coming-label { display: inline-flex; align-items: center; gap: 7px; margin-top: auto; color: #9a8a6e; font-size: 12px; font-weight: 600; }
    .coming-label span { width: 6px; height: 6px; border-radius: 50%; background: #c4a775; }
    .home-footer { display: flex; justify-content: space-between; gap: 20px; padding: 18px 0 22px; border-top: 1px solid #e1e7e6; color: #89969a; font-size: 12px; }
    .dark-theme { color-scheme: dark; background: #10191d; color: #dce6e6; }
    .dark-theme .site-header { background: #10191d; }
    .dark-theme .brand, .dark-theme .hero h1, .dark-theme .section-title h2, .dark-theme .tool-card h3 { color: #e8f0ef; }
    .dark-theme .brand-copy span, .dark-theme .nav-link, .dark-theme .section-title > p, .dark-theme .tool-card > p { color: #9aabad; }
    .dark-theme .nav-link:hover, .dark-theme .nav-link.active { color: #8dd4cb; background: #203437; }
    .dark-theme .theme-toggle { border-color: #34464a; background: #1a282c; color: #dce6e6; }
    .dark-theme .theme-toggle:hover { border-color: #56847f; color: #a8e4dc; }
    .dark-theme .hero, .dark-theme .tool-card { border-color: #2a3b40; background: #182428; box-shadow: 0 14px 42px #0003; }
    .dark-theme .hero-description { color: #a6b4b5; }
    .dark-theme .hero-caption, .dark-theme .tool-tag { color: #94a5a6; }
    .dark-theme .hero-art { background: linear-gradient(145deg, #263b3c 0%, #1d3133 48%, #172a2d 100%); }
    .dark-theme .art-topline, .dark-theme .art-label { color: #aac1bd; }
    .dark-theme .upcoming-card { background: #1b2628; }
    .dark-theme .home-footer { border-color: #2a3b40; color: #8e9e9f; }
    .dark-theme .invoice-icon { background: #213c3b; color: #8dd4cb; }
    .dark-theme .rates-icon { background: #2a3043; color: #b4bff0; }
    .dark-theme .history-icon { background: #393328; color: #d8bb86; }
    .dark-theme .photo-icon { background: #392d40; color: #d4a9e5; }
    @media (max-width: 900px) { .site-header { padding: 0 4%; } .home-page { padding-right: 4%; padding-left: 4%; } .hero-copy { padding: 42px 34px; } .hero h1 { font-size: 45px; } .tool-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; } .tool-card { padding: 18px; } }
    @media (max-width: 680px) { .site-header { height: auto; min-height: 72px; flex-wrap: wrap; gap: 10px; padding: 12px 16px; } .brand-mark { width: 34px; height: 34px; } .brand-copy strong { font-size: 16px; } .main-nav { flex-wrap: wrap; justify-content: flex-end; gap: 2px; } .nav-link, .nav-action, .theme-toggle { min-height: 38px; padding: 0 9px; font-size: 12px; } .nav-action { margin-left: 2px; } .home-page { padding: 12px 14px 0; } .hero { grid-template-columns: 1fr; } .hero-copy { padding: 36px 26px 28px; } .hero h1 { max-width: 480px; font-size: clamp(38px, 10vw, 48px); } .hero-description { font-size: 15px; } .hero-caption { margin-top: 25px; } .hero-art { min-height: 275px; } .window-illustration { width: 135px; } .art-topline { top: 17px; right: 18px; left: 18px; } .art-label { right: 18px; bottom: 18px; } .art-watermark { right: 20px; bottom: 38px; font-size: 42px; } .workspace-section { padding: 37px 0 24px; } .section-title { display: block; } .section-title h2 { font-size: 24px; } .section-title > p { margin-top: 8px; } .tool-grid { grid-template-columns: 1fr; gap: 10px; } .tool-card { min-height: 205px; } }
    @media (max-width: 390px) { .brand-copy span { font-size: 9px; } .main-nav { width: 100%; justify-content: space-between; } .nav-action { margin-left: 0; } .hero-actions { gap: 13px; } .primary-action { gap: 10px; } .home-footer { flex-direction: column; gap: 7px; } }
  `],
})
export class AppComponent {
  page: 'landing' | 'invoice' | 'rates' | 'photo-quote' = 'landing';
  isDarkMode = localStorage.getItem('shantanu-theme') === 'dark';

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('shantanu-theme', this.isDarkMode ? 'dark' : 'light');
  }
}
