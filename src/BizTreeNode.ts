import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';

export interface TreeNodeData {
  id: string | number;
  label: string;
  expanded?: boolean;
  children?: TreeNodeData[];
}

@customElement('biz-tree-node')
export class BizTreeNode extends LitElement {
  @property({ type: Object }) node: TreeNodeData | null = null;

  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      user-select: none;
    }

    .node-row {
      display: flex;
      align-items: center;
      padding: 4px 8px;
      cursor: pointer;
      border-radius: 4px;
      transition: background-color 0.2s;
    }

    .node-row:hover {
      background-color: #f0f0f0;
    }

    .toggle-icon {
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 4px;
      color: #666;
      transition: transform 0.2s;
    }

    .toggle-icon.expanded {
      transform: rotate(90deg);
    }

    .label {
      flex: 1;
      font-size: 14px;
    }

    .children {
      margin-left: 20px;
      border-left: 1px solid #e0e0e0;
    }

    .empty-spacer {
      width: 20px;
    }
  `;

  private _handleToggle(e: Event) {
    e.stopPropagation();
    if (!this.node) return;

    this.dispatchEvent(new CustomEvent('node-toggle', {
      detail: { id: this.node.id, expanded: !this.node.expanded },
      bubbles: true,
      composed: true
    }));
  }

  private _handleSelect(e: Event) {
    e.stopPropagation();
    if (!this.node) return;

    this.dispatchEvent(new CustomEvent('node-select', {
      detail: { id: this.node.id },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    if (!this.node) return html``;

    const hasChildren = this.node.children && this.node.children.length > 0;

    return html`
      <div class="node-wrapper">
        <div class="node-row" @click=${this._handleSelect}>
          ${hasChildren ? html`
            <div 
              class="toggle-icon ${this.node.expanded ? 'expanded' : ''}" 
              @click=${this._handleToggle}
            >
              ▶
            </div>
          ` : html`<div class="empty-spacer"></div>`}
          <span class="label">${this.node.label}</span>
        </div>

        ${hasChildren && this.node.expanded ? html`
          <div class="children">
            ${repeat(this.node.children!, (child) => child.id, (child) => html`
              <biz-tree-node .node=${child}></biz-tree-node>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-tree-node': BizTreeNode;
  }
}
