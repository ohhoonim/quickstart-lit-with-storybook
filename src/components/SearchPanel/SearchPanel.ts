import { html, type TemplateResult } from 'lit';
import './searchpanel.css';

export interface SearchPanelProps {
  expanded?: boolean;
  hideReset?: boolean;
  onToggle?: () => void;
  onSearch?: () => void;
  onReset?: () => void;
  children?: TemplateResult;
}

/** SearchPanel component */
export const SearchPanel = ({
  expanded = true,
  hideReset = false,
  onToggle,
  onSearch,
  onReset,
  children
}: SearchPanelProps) => {
  return html`
    <div class="search-panel-container ${expanded ? 'expanded' : ''}">
      <div class="header" @click=${onToggle}>
        <div class="title">
          <span class="toggle-icon">▼</span>
          검색 필터
        </div>
      </div>
      <div class="content">
        ${children}
        <div class="actions">
          ${!hideReset ? html`
            <button class="btn-reset" @click=${onReset}>초기화</button>
          ` : ''}
          <button class="btn-search" @click=${onSearch}>검색</button>
        </div>
      </div>
    </div>
  `;
};
