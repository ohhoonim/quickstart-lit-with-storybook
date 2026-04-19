import { html, type TemplateResult } from 'lit';
import './dialog.css';

export interface DialogProps {
  open?: boolean;
  modal?: boolean;
  onClose?: () => void;
  onBackdropClick?: (e: MouseEvent) => void;
  children?: TemplateResult;
}

/** Dialog component */
export const Dialog = ({
  open = false,
  modal = true,
  onClose,
  onBackdropClick,
  children
}: DialogProps) => {
  return html`
    <div 
      class="backdrop ${open ? 'open' : ''} ${!modal ? 'non-modal' : ''}" 
      @click=${onBackdropClick}
    >
      <div 
        class="dialog-content" 
        role="dialog" 
        aria-modal=${modal}
        tabindex="-1"
      >
        <button class="close-button" @click=${onClose} aria-label="Close dialog">&times;</button>
        ${children}
      </div>
    </div>
  `;
};
