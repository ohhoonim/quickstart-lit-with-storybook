import { html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import './TreeNode.css';

export interface TreeNodeData {
  id: string | number;
  label: string;
  expanded?: boolean;
  children?: TreeNodeData[];
}

export interface TreeNodeProps {
  node: TreeNodeData;
  onToggle?: (id: string | number, expanded: boolean) => void;
  onSelect?: (id: string | number) => void;
}

/** Recursive tree node component */
export const TreeNode = ({ node, onToggle, onSelect }: TreeNodeProps) => {
  if (!node) return html``;

  const hasChildren = node.children && node.children.length > 0;

  const handleToggle = (e: Event) => {
    e.stopPropagation();
    if (onToggle) {
      onToggle(node.id, !node.expanded);
    }
  };

  const handleSelect = (e: Event) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(node.id);
    }
  };

  return html`
    <div class="biz-tree-wrapper">
      <div class="biz-node-row" @click=${handleSelect}>
        ${hasChildren ? html`
          <div 
            class="biz-toggle-icon ${node.expanded ? 'biz-toggle-icon--expanded' : ''}" 
            @click=${handleToggle}
          >
            ▶
          </div>
        ` : html`<div class="biz-empty-spacer"></div>`}
        <span class="biz-node-label">${node.label}</span>
      </div>

      ${hasChildren && node.expanded ? html`
        <div class="biz-node-children">
          ${repeat(node.children!, (child) => child.id, (child) => 
            TreeNode({ node: child, onToggle, onSelect })
          )}
        </div>
      ` : ''}
    </div>
  `;
};
