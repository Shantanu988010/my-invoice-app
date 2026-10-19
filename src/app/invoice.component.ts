import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface InvoiceItem {
  particulate: string;
  size: string;
  sqFt: string;
  totalSqFt: number | string;
  rate: number | string;
}

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  template: `
    <div class="workspace" [class.mobile]="isMobile">
      <section class="editor">
        <h2>Edit Invoice Variables</h2>
        <div class="field"><label for="billed-to">Billed To</label><input id="billed-to" [(ngModel)]="invoice.to"></div>
        <div class="field"><label for="subject">Subject</label><input id="subject" [(ngModel)]="invoice.subject"></div>
        <div class="field"><label for="description">Description</label><textarea id="description" rows="3" [(ngModel)]="invoice.description"></textarea></div>
        <hr>
        <h3>Item Details</h3>
        @for (item of invoice.items; track $index; let i = $index) {
          <article class="item-card">
            @if (invoice.items.length > 1) { <button class="remove" (click)="removeItem(i)">× Remove</button> }
            <div class="field"><label [for]="'particulate-' + i">Particulate Name</label><input [id]="'particulate-' + i" [(ngModel)]="item.particulate"></div>
            <div class="field-row">
              <div class="field"><label [for]="'size-' + i">Size (Text)</label><input [id]="'size-' + i" [(ngModel)]="item.size"></div>
              <div class="field"><label [for]="'sqft-' + i">Sq/Ft (Text)</label><input [id]="'sqft-' + i" [(ngModel)]="item.sqFt"></div>
            </div>
            <div class="field-row">
              <div class="field"><label [for]="'total-' + i">Total Sq/Ft (Number)</label><input [id]="'total-' + i" type="number" [(ngModel)]="item.totalSqFt"></div>
              <div class="field"><label [for]="'rate-' + i">Rate</label><input [id]="'rate-' + i" type="number" [(ngModel)]="item.rate"></div>
            </div>
          </article>
        }
        <button class="add-button" (click)="addItem()">+ Add Another Item</button>
        <div class="field"><label for="gst">GST Percentage (%)</label><input id="gst" type="number" [(ngModel)]="invoice.gstRate"></div>
        <div class="field"><label for="terms">Terms &amp; Conditions (One per line)</label><textarea id="terms" rows="5" [(ngModel)]="invoice.terms"></textarea></div>
        <div class="field"><label for="signoff">Signoff Name</label><input id="signoff" [(ngModel)]="invoice.signoff"></div>
        @if (!isMobile) { <button class="download" (click)="downloadPdf()">Download as PDF</button> }
      </section>
      <section class="preview-area">
        @if (isMobile) { <button class="download mobile-download" (click)="downloadPdf()">Download as PDF</button> }
        <article class="invoice-paper" #invoicePaper>
          <div class="banner"><img src="/logo-sg.png" alt="Shantanu Glass Banner"></div>
          <div class="invoice-meta">
            <div><strong>To.</strong> {{ invoice.to }}</div>
            <div><strong>Sub:</strong> {{ invoice.subject }}</div>
            <div><strong>Description:</strong> {{ invoice.description }}</div>
          </div>
          <table class="line-items">
            <thead><tr><th>Particulates</th><th>Size</th><th>Sq/Ft</th><th>Total Sq/Ft</th><th>Rate</th><th>Amount</th></tr></thead>
            <tbody>
              @for (item of invoice.items; track $index) {
                <tr><td>{{ item.particulate }}</td><td>{{ item.size }}</td><td>{{ item.sqFt }}</td><td>{{ item.totalSqFt }}</td><td>{{ item.rate }}</td><td>{{ amount(item) | number:'1.0-0':'en-IN' }}</td></tr>
              }
            </tbody>
          </table>
          <div class="summary">
            <div class="terms"><strong>Terms &amp; Conditions</strong>
              @for (line of invoice.terms.split('\n'); track $index) { <div>{{ line }}</div> }
            </div>
            <table class="totals"><tbody>
              <tr><td>Total</td><td>{{ subtotal | number:'1.0-0':'en-IN' }}</td></tr>
              <tr><td>GST {{ invoice.gstRate }}%</td><td>{{ gst | number:'1.0-0':'en-IN' }}</td></tr>
              <tr><td><strong>Total Amount</strong></td><td><strong>{{ grandTotal | number:'1.0-0':'en-IN' }}</strong></td></tr>
            </tbody></table>
          </div>
          <div class="signoff"><p>Thanks</p><p>{{ invoice.signoff }}</p></div>
        </article>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--font-system); }
    .workspace { display: flex; min-height: calc(100vh - 82px); height: calc(100vh - 82px); background: #edf3f1; }
    .editor { flex: 0 0 450px; padding: 24px; background: #fff; overflow-y: auto; box-sizing: border-box; border-right: 1px solid #dfe8e5; box-shadow: 5px 0 20px #1c3c3b0a; }
    h2 { margin: 0 0 20px; color: #203b40; font-size: 22px; } h3 { margin: 0 0 10px; color: #2a4147; font-size: 18px; }
    .field { flex: 1; min-width: 0; margin-bottom: 12px; }
    label { display: block; margin-bottom: 6px; color: #334155; font-size: 14px; font-weight: 700; }
    input, textarea { width: 100%; padding: 10px 11px; border: 1px solid #d4dfdd; border-radius: 6px; box-sizing: border-box; font: inherit; font-size: 15px; transition: border-color .15s, box-shadow .15s; }
    input:focus, textarea:focus { outline: none; border-color: #559890; box-shadow: 0 0 0 3px #55989020; }
    textarea { resize: vertical; } hr { margin: 20px 0; border: 0; border-top: 1px solid #cbd5e1; }
    .item-card { position: relative; margin-bottom: 15px; padding: 15px; border: 1px solid #dce7e4; border-radius: 8px; background: #f7faf9; }
    .field-row { display: flex; gap: 10px; } .remove { float: right; padding: 5px 9px; background: #ef4444; color: white; font-size: 13px; }
    .add-button, .download { width: 100%; padding: 12px; border: 0; border-radius: 5px; color: white; cursor: pointer; font: inherit; font-weight: 700; }
    .add-button { margin-bottom: 20px; background: #4b9189; } .add-button:hover { background: #397c75; } .download { margin-top: 10px; padding: 15px; background: #173f45; font-size: 16px; }
    .preview-area { flex: 1; overflow: auto; padding: 40px; display: flex; flex-direction: column; align-items: center; box-sizing: border-box; background: #edf3f1; }
    .invoice-paper { flex: none; width: 210mm; min-height: 297mm; padding: 20mm; box-sizing: border-box; background: white; color: black; box-shadow: 0 10px 15px #0002; font-family: var(--font-system); }
    .banner { margin-bottom: 20px; } .banner img { display: block; width: 100%; height: auto; }
    .invoice-meta { margin-bottom: 25px; font-size: 16px; line-height: 1.65; overflow-wrap: anywhere; }
    table { border-collapse: collapse; } .line-items { width: 100%; margin-bottom: 30px; font-size: 15px; }
    th, td { border: 1px solid black; padding: 10px; } th { text-align: center; } th:first-child, td:first-child { text-align: left; } th:last-child, td:last-child { text-align: right; }
    .summary { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
    .terms { width: 55%; font-size: 15px; line-height: 1.8; white-space: pre-wrap; overflow-wrap: anywhere; } .terms strong { display: block; margin-bottom: 10px; text-decoration: underline; }
    .totals { width: 40%; font-size: 15px; } .totals td { text-align: right; } .totals td:first-child { font-weight: 700; }
    .signoff { margin-top: 70px; text-align: right; font-size: 16px; font-weight: 700; } .signoff p:first-child { margin: 0 0 50px; } .signoff p:last-child { margin: 0; }
    .mobile-download { display: none; }
    :host-context(.dark-theme) .workspace { background: #111b1f; }
    :host-context(.dark-theme) .editor { border-color: #2a3b40; background: #182428; box-shadow: 5px 0 20px #0003; }
    :host-context(.dark-theme) h2, :host-context(.dark-theme) h3 { color: #e3eceb; }
    :host-context(.dark-theme) label { color: #c3d0d0; }
    :host-context(.dark-theme) input, :host-context(.dark-theme) textarea { border-color: #3a4d50; background: #111b1f; color: #e3eceb; color-scheme: dark; }
    :host-context(.dark-theme) hr { border-top-color: #34464a; }
    :host-context(.dark-theme) .item-card { border-color: #34464a; background: #1d2b2f; }
    :host-context(.dark-theme) .preview-area { background: #111b1f; }
    :host-context(.dark-theme) .mobile .editor { border-bottom-color: #34464a; }
    .mobile { height: auto; min-height: calc(100vh - 82px); flex-direction: column; }
    .mobile .editor { flex: none; width: 100%; padding: 18px 15px; overflow: visible; border-right: 0; border-bottom: 1px solid #d5e2df; box-shadow: none; }
    .mobile .field-row { flex-direction: column; gap: 0; }
    .mobile .preview-area { width: 100%; padding: 10px; align-items: flex-start; overflow: auto; }
    .mobile-download { display: block; position: sticky; top: 0; z-index: 2; width: calc(100vw - 20px); margin: 0 0 20px; box-shadow: 0 4px 6px #0002; }
    @media (max-width: 520px) { .invoice-paper { transform-origin: top left; } }
  `],
})
export class InvoiceComponent {
  @ViewChild('invoicePaper') invoicePaper!: ElementRef<HTMLElement>;
  isMobile = window.innerWidth <= 768;
  invoice = {
    to: 'FSE Solutions Pvt Ltd,', subject: '1inch Series Double Door',
    description: '1 inch Series Handle, Middle With Double Door White Colour Composite Panel with Fitting with Hinges',
    items: [{ particulate: 'Double Door', size: '102 1/2 * 7', sqFt: '73.5', totalSqFt: 73.5, rate: 185 }] as InvoiceItem[],
    gstRate: 18, terms: '1. 60% Advance Payment Applicable\n2. 20% After Glass Work\n3. 15% After Celling Work\n4. 5% After Complete Work',
    signoff: 'Shantanu Glass and Aluminum',
  };

  @HostListener('window:resize') onResize(): void { this.isMobile = window.innerWidth <= 768; }

  amount(item: InvoiceItem): number { return (Number(item.totalSqFt) || 0) * (Number(item.rate) || 0); }
  get subtotal(): number { return this.invoice.items.reduce((sum, item) => sum + this.amount(item), 0); }
  get gst(): number { return Math.round(this.subtotal * (Number(this.invoice.gstRate) / 100 || 0)); }
  get grandTotal(): number { return Math.round(this.subtotal + this.gst); }

  addItem(): void { this.invoice.items.push({ particulate: '', size: '', sqFt: '', totalSqFt: '', rate: '' }); }
  removeItem(index: number): void { this.invoice.items.splice(index, 1); }

  async downloadPdf(): Promise<void> {
    const canvas = await html2canvas(this.invoicePaper.nativeElement, { scale: 1.5, useCORS: true, logging: false });
    const image = canvas.toDataURL('image/jpeg', 0.7);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const width = pdf.internal.pageSize.getWidth();
    const properties = pdf.getImageProperties(image);
    const height = (properties.height * width) / properties.width;
    pdf.addImage(image, 'JPEG', 0, 0, width, height, undefined, 'FAST');
    const filename = this.invoice.to.replace(/[^a-zA-Z0-9]/g, '_');
    pdf.save(`${filename}_Invoice.pdf`);
  }
}
