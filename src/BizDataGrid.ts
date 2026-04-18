import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

export interface ColumnDefinition {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date';
  sortable?: boolean;
}

export interface SortChangeEventDetail {
  key: string;
  order: 'asc' | 'desc' | null;
}

@customElement('biz-data-grid')
export class BizDataGrid extends LitElement {
  @property({ type: Array }) columns: ColumnDefinition[] = [];
  @property({ type: Array }) data: any[] = [];
  @property({ type: Boolean }) loading = false;

  @state() private _sortKey: string | null = null;
  @state() private _sortOrder: 'asc' | 'desc' | null = null;

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      width: 100%;
      overflow-x: auto;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      position: relative;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }

    th, td {
      padding: 12px 16px;
      border-bottom: 1px solid #e0e0e0;
    }

    th {
      background-color: #f5f5f5;
      font-weight: 600;
      color: #333;
      user-select: none;
    }

    th.sortable {
      cursor: pointer;
    }

    th.sortable:hover {
      background-color: #eeeeee;
    }

    tr:hover td {
      background-color: #fafafa;
      cursor: pointer;
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
    }

    .sort-indicator {
      margin-left: 4px;
      font-size: 0.8em;
    }

    .spinner {
      width: 30px;
      height: 30px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  private _handleHeaderClick(column: ColumnDefinition) {
    if (!column.sortable) return;

    if (this._sortKey === column.key) {
      this._sortOrder = this._sortOrder === 'asc' ? 'desc' : this._sortOrder === 'desc' ? null : 'asc';
    } else {
      this._sortKey = column.key;
      this._sortOrder = 'asc';
    }

    this.dispatchEvent(new CustomEvent<SortChangeEventDetail>('sort-change', {
      detail: {
        key: column.key,
        order: this._sortOrder
      },
      bubbles: true,
      composed: true
    }));
  }

  private _handleRowClick(row: any) {
    this.dispatchEvent(new CustomEvent('row-click', {
      detail: row,
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      ${this.loading ? html`
        <div class="loading-overlay">
          <div class="spinner"></div>
        </div>
      ` : ''}
      <table>
        <thead>
          <tr>
            ${this.columns.map(col => html`
              <th 
                class="${col.sortable ? 'sortable' : ''}" 
                @click=${() => this._handleHeaderClick(col)}
              >
                ${col.label}
                ${this._sortKey === col.key ? html`
                  <span class="sort-indicator">
                    ${this._sortOrder === 'asc' ? '▲' : this._sortOrder === 'desc' ? '▼' : ''}
                  </span>
                ` : ''}
              </th>
            `)}
          </tr>
        </thead>
        <tbody>
          ${repeat(
            this.data,
            (item) => item.id || JSON.stringify(item),
            (item) => html`
              <tr @click=${() => this._handleRowClick(item)}>
                ${this.columns.map(col => html`
                  <td>${item[col.key]}</td>
                `)}
              </tr>
            `
          )}
        </tbody>
      </table>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-data-grid': BizDataGrid;
  }
}
