import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

export interface TabItem {
  id: string;
  title: string;
  pinned?: boolean;
}

@customElement('biz-tab-navigator')
export class BizTabNavigator extends LitElement {
  @property({ type: Array }) tabs: TabItem[] = [];
  @property({ type: Number }) maxTabCount = 20;
  @property({ type: String }) activeTabId = '';

  @query('.tab-list') private _tabList!: HTMLElement;

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      border-bottom: 1px solid #e0e0e0;
    }

    .container {
      display: flex;
      align-items: center;
      position: relative;
    }

    .tab-list {
      display: flex;
      overflow-x: auto;
      scrollbar-width: none;
      -ms-overflow-style: none;
      scroll-behavior: smooth;
      flex: 1;
    }

    .tab-list::-webkit-scrollbar {
      display: none;
    }

    .tab {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      background: #f8f9fa;
      border: 1px solid #e0e0e0;
      border-bottom: none;
      margin-right: 2px;
      cursor: pointer;
      white-space: nowrap;
      border-radius: 4px 4px 0 0;
      min-width: 100px;
      max-width: 200px;
      position: relative;
    }

    .tab.active {
      background: white;
      border-bottom: 1px solid white;
      margin-bottom: -1px;
      color: #3498db;
      font-weight: 600;
    }

    .tab-title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .close-btn {
      margin-left: 8px;
      font-size: 16px;
      line-height: 1;
      color: #999;
    }

    .close-btn:hover {
      color: #e74c3c;
    }

    .nav-btn {
      padding: 8px;
      cursor: pointer;
      background: white;
      border: 1px solid #e0e0e0;
      z-index: 10;
    }
  `;

  public openTab(tab: TabItem) {
    if (this.tabs.find(t => t.id === tab.id)) {
      this.activeTabId = tab.id;
      this.scrollIntoView(tab.id);
      return;
    }

    if (this.tabs.length >= this.maxTabCount) {
      this.dispatchEvent(new CustomEvent('tab-overflow'));
      // Policy: Remove oldest non-pinned tab
      const oldestIndex = this.tabs.findIndex(t => !t.pinned);
      if (oldestIndex !== -1) {
        this.tabs = [...this.tabs.slice(0, oldestIndex), ...this.tabs.slice(oldestIndex + 1)];
      } else {
        return; // All tabs pinned, cannot open
      }
    }

    this.tabs = [...this.tabs, tab];
    this.activeTabId = tab.id;
    setTimeout(() => this.scrollIntoView(tab.id), 0);
  }

  public scrollIntoView(tabId: string) {
    const tabEl = this.shadowRoot?.querySelector(`[data-id="${tabId}"]`) as HTMLElement;
    if (tabEl) {
      tabEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  private _handleTabClick(tabId: string) {
    this.activeTabId = tabId;
    this.dispatchEvent(new CustomEvent('tab-change', {
      detail: { id: tabId },
      bubbles: true,
      composed: true
    }));
  }

  private _handleClose(e: Event, tabId: string) {
    e.stopPropagation();
    this.tabs = this.tabs.filter(t => t.id !== tabId);
    this.dispatchEvent(new CustomEvent('tab-close', {
      detail: { id: tabId },
      bubbles: true,
      composed: true
    }));
  }

  private _scroll(direction: 'left' | 'right') {
    const amount = 200;
    this._tabList.scrollLeft += (direction === 'left' ? -amount : amount);
  }

  render() {
    return html`
      <div class="container">
        <button class="nav-btn" @click=${() => this._scroll('left')}>&lt;</button>
        <div class="tab-list" role="tablist">
          ${this.tabs.map(tab => html`
            <div 
              class="tab ${this.activeTabId === tab.id ? 'active' : ''}" 
              data-id="${tab.id}"
              role="tab"
              aria-selected="${this.activeTabId === tab.id}"
              @click=${() => this._handleTabClick(tab.id)}
            >
              <span class="tab-title">${tab.title}</span>
              ${!tab.pinned ? html`
                <span class="close-btn" @click=${(e: Event) => this._handleClose(e, tab.id)}>&times;</span>
              ` : ''}
            </div>
          `)}
        </div>
        <button class="nav-btn" @click=${() => this._scroll('right')}>&gt;</button>
      </div>
    `;
  }
}
