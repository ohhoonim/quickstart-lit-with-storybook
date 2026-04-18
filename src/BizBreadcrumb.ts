import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

@customElement('biz-breadcrumb')
export class BizBreadcrumb extends LitElement {
  @property({ type: Array }) items: BreadcrumbItem[] = [];

  static styles = css`
    nav {
      font-family: sans-serif;
      font-size: 14px;
    }
    ol {
      list-style: none;
      display: flex;
      padding: 0;
      margin: 0;
    }
    li {
      display: flex;
      align-items: center;
    }
    li:not(:last-child)::after {
      content: '/';
      margin: 0 8px;
      color: #999;
    }
    a {
      color: #3498db;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    [aria-current="page"] {
      color: #333;
      font-weight: 600;
    }
  `;

  private _handleClick(e: Event, item: BreadcrumbItem) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('path-click', {
      detail: item,
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <nav aria-label="Breadcrumb">
        <ol>
          ${this.items.map((item, index) => {
            const isLast = index === this.items.length - 1;
            return html`
              <li>
                ${isLast 
                  ? html`<span aria-current="page">${item.label}</span>`
                  : html`<a href="${item.href || '#'}" @click=${(e: Event) => this._handleClick(e, item)}>${item.label}</a>`
                }
              </li>
            `;
          })}
        </ol>
      </nav>
    `;
  }
}
