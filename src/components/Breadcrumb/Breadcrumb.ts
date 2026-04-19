import { html } from 'lit';
import './breadcrumb.css';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  /** The items to display in the breadcrumb */
  items: BreadcrumbItem[];
  /** Optional click handler for path items */
  onPathClick?: (item: BreadcrumbItem) => void;
}

/** Primary UI component for hierarchical navigation */
export const Breadcrumb = ({ items, onPathClick }: BreadcrumbProps) => {
  const handleClick = (e: Event, item: BreadcrumbItem) => {
    e.preventDefault();
    if (onPathClick) {
      onPathClick(item);
    }
  };

  return html`
    <nav class="biz-breadcrumb-nav" aria-label="Breadcrumb">
      <ol class="biz-breadcrumb-list">
        ${items.map((item, index) => {
          const isLast = index === items.length - 1;
          return html`
            <li class="biz-breadcrumb-item">
              ${isLast 
                ? html`<span class="biz-breadcrumb-current" aria-current="page">${item.label}</span>`
                : html`
                  <a 
                    href="${item.href || '#'}" 
                    class="biz-breadcrumb-link"
                    @click=${(e: Event) => handleClick(e, item)}
                  >
                    ${item.label}
                  </a>`
              }
            </li>
          `;
        })}
      </ol>
    </nav>
  `;
};
