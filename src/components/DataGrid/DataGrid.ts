import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './DataGrid.css';

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

export interface DataGridProps {
  columns: ColumnDefinition[];
  data: any[];
  loading?: boolean;
  sortKey?: string | null;
  sortOrder?: 'asc' | 'desc' | null;
  onHeaderClick?: (column: ColumnDefinition) => void;
  onRowClick?: (row: any) => void;
}

/** DataGrid component */
export const DataGrid = ({
  columns = [],
  data = [],
  loading = false,
  sortKey = null,
  sortOrder = null,
  onHeaderClick,
  onRowClick
}: DataGridProps) => {
  return html`
    ${loading ? html`
      <div class="loading-overlay">
        <div class="spinner"></div>
      </div>
    ` : ''}
    <table>
      <thead>
        <tr>
          ${columns.map(col => html`
            <th 
              class="${col.sortable ? 'sortable' : ''}" 
              @click=${() => onHeaderClick?.(col)}
            >
              ${col.label}
              ${sortKey === col.key ? html`
                <span class="sort-indicator">
                  ${sortOrder === 'asc' ? '▲' : sortOrder === 'desc' ? '▼' : ''}
                </span>
              ` : ''}
            </th>
          `)}
        </tr>
      </thead>
      <tbody>
        ${repeat(
          data,
          (item) => item.id || JSON.stringify(item),
          (item) => html`
            <tr @click=${() => onRowClick?.(item)}>
              ${columns.map(col => html`
                <td>${item[col.key]}</td>
              `)}
            </tr>
          `
        )}
      </tbody>
    </table>
  `;
};
