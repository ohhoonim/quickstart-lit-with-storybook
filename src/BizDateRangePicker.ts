import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('biz-date-range-picker')
export class BizDateRangePicker extends LitElement {
  @property({ type: String }) startDate = '';
  @property({ type: String }) endDate = '';
  @property({ type: String }) minDate = '';
  @property({ type: String }) maxDate = '';

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: sans-serif;
    }
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    label {
      font-size: 12px;
      color: #666;
    }
    input {
      padding: 6px 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }
    input:focus {
      border-color: #3498db;
      outline: none;
    }
    .separator {
      margin-top: 20px;
      color: #999;
    }
  `;

  private _handleStartChange(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    if (this.endDate && val > this.endDate) {
      alert('시작일은 종료일보다 늦을 수 없습니다.');
      (e.target as HTMLInputElement).value = this.startDate;
      return;
    }
    this.startDate = val;
    this._dispatchEvent();
  }

  private _handleEndChange(e: Event) {
    const val = (e.target as HTMLInputElement).value;
    if (this.startDate && val < this.startDate) {
      alert('종료일은 시작일보다 빠를 수 없습니다.');
      (e.target as HTMLInputElement).value = this.endDate;
      return;
    }
    this.endDate = val;
    this._dispatchEvent();
  }

  private _dispatchEvent() {
    if (this.startDate && this.endDate) {
      this.dispatchEvent(new CustomEvent('range-change', {
        detail: { start: this.startDate, end: this.endDate },
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    return html`
      <div class="input-group">
        <label>시작일</label>
        <input 
          type="date" 
          .value=${this.startDate} 
          .min=${this.minDate} 
          .max=${this.maxDate || this.endDate}
          @change=${this._handleStartChange}
        >
      </div>
      <span class="separator">~</span>
      <div class="input-group">
        <label>종료일</label>
        <input 
          type="date" 
          .value=${this.endDate} 
          .min=${this.minDate || this.startDate} 
          .max=${this.maxDate}
          @change=${this._handleEndChange}
        >
      </div>
    `;
  }
}
