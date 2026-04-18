import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('biz-search-panel')
export class BizSearchPanel extends LitElement {
  @property({ type: Boolean, reflect: true }) expanded = true;
  @property({ type: Boolean }) hideReset = false;

  static styles = css`
    :host {
      display: block;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      font-family: sans-serif;
      margin-bottom: 20px;
    }

    .header {
      background: #f8f9fa;
      padding: 12px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }

    .title {
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .toggle-icon {
      transition: transform 0.2s;
    }

    :host([expanded]) .toggle-icon {
      transform: rotate(180deg);
    }

    .content {
      padding: 20px;
      display: none;
      background: white;
    }

    :host([expanded]) .content {
      display: block;
    }

    .actions {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      border-top: 1px solid #f0f0f0;
      padding-top: 16px;
    }

    button {
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      border: 1px solid #ccc;
    }

    .btn-search {
      background: #3498db;
      color: white;
      border: none;
    }

    .btn-search:hover { background: #2980b9; }

    .btn-reset {
      background: white;
    }

    .btn-reset:hover { background: #f5f5f5; }
  `;

  private _handleToggle() {
    this.expanded = !this.expanded;
    this.dispatchEvent(new CustomEvent('toggle', {
      detail: { expanded: this.expanded },
      bubbles: true,
      composed: true
    }));
  }

  private _handleSearch() {
    this.dispatchEvent(new CustomEvent('search', {
      bubbles: true,
      composed: true
    }));
  }

  private _handleReset() {
    this.dispatchEvent(new CustomEvent('reset', {
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="header" @click=${this._handleToggle}>
        <div class="title">
          <span class="toggle-icon">▼</span>
          검색 필터
        </div>
      </div>
      <div class="content">
        <slot></slot>
        <div class="actions">
          ${!this.hideReset ? html`
            <button class="btn-reset" @click=${this._handleReset}>초기화</button>
          ` : ''}
          <button class="btn-search" @click=${this._handleSearch}>검색</button>
        </div>
      </div>
    `;
  }
}
