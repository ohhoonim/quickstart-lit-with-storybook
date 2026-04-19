import { html } from 'lit';
import './tabnavigator.css';

export interface TabItem {
  id: string;
  title: string;
  pinned?: boolean;
}

export interface TabNavigatorProps {
  tabs: TabItem[];
  activeTabId?: string;
  onTabClick?: (id: string) => void;
  onTabClose?: (e: Event, id: string) => void;
  onScroll?: (direction: 'left' | 'right') => void;
}

/** TabNavigator component */
export const TabNavigator = ({
  tabs = [],
  activeTabId = '',
  onTabClick,
  onTabClose,
  onScroll
}: TabNavigatorProps) => {
  return html`
    <div class="container">
      <button class="nav-btn" @click=${() => onScroll?.('left')}>&lt;</button>
      <div class="tab-list" role="tablist">
        ${tabs.map(tab => html`
          <div 
            class="tab ${activeTabId === tab.id ? 'active' : ''}" 
            data-id="${tab.id}"
            role="tab"
            aria-selected="${activeTabId === tab.id}"
            @click=${() => onTabClick?.(tab.id)}
          >
            <span class="tab-title">${tab.title}</span>
            ${!tab.pinned ? html`
              <span class="close-btn" @click=${(e: Event) => onTabClose?.(e, tab.id)}>&times;</span>
            ` : ''}
          </div>
        `)}
      </div>
      <button class="nav-btn" @click=${() => onScroll?.('right')}>&gt;</button>
    </div>
  `;
};
