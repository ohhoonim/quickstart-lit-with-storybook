import { LitElement, html, css, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('biz-dialog')
export class BizDialog extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean }) modal = true;

  @query('.dialog-content') private _dialogContent!: HTMLElement;

  static styles = css`
    :host {
      display: contents;
    }

    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    :host([open]) .backdrop {
      display: flex;
    }

    .dialog-content {
      background: white;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      max-width: 500px;
      width: 90%;
      position: relative;
      outline: none;
    }

    .close-button {
      position: absolute;
      top: 12px;
      right: 12px;
      border: none;
      background: none;
      font-size: 20px;
      cursor: pointer;
      color: #666;
    }

    .close-button:hover {
      color: #000;
    }

    /* Modal specific styles */
    .backdrop.non-modal {
      background: transparent;
      pointer-events: none;
    }

    .non-modal .dialog-content {
      pointer-events: auto;
    }
  `;

  protected updated(changedProperties: PropertyValues) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._onOpen();
      } else {
        this._onClose();
      }
    }
  }

  private _onOpen() {
    if (this.modal) {
      document.body.style.overflow = 'hidden';
      this.addEventListener('keydown', this._handleKeyDown);
      setTimeout(() => {
        this._focusFirstElement();
      }, 0);
    }
  }

  private _onClose() {
    if (this.modal) {
      document.body.style.overflow = '';
      this.removeEventListener('keydown', this._handleKeyDown);
    }
  }

  private _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this._requestClose();
    } else if (e.key === 'Tab') {
      this._handleFocusTrap(e);
    }
  };

  private _handleFocusTrap(e: KeyboardEvent) {
    const focusableElements = this._getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstElement || document.activeElement === this._dialogContent) {
        e.preventDefault();
        lastElement.focus();
      }
    } else { // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }

  private _getFocusableElements(): HTMLElement[] {
    const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const elements = Array.from(this.querySelectorAll(selector)) as HTMLElement[];
    // Include close button if it's in shadow DOM
    const closeBtn = this.renderRoot.querySelector('.close-button') as HTMLElement;
    return [closeBtn, ...elements].filter(el => el && !el.hasAttribute('disabled'));
  }

  private _focusFirstElement() {
    const elements = this._getFocusableElements();
    if (elements.length > 0) {
      elements[0].focus();
    } else {
      this._dialogContent.focus();
    }
  }

  private _requestClose() {
    this.dispatchEvent(new CustomEvent('close', {
      bubbles: true,
      composed: true
    }));
  }

  private _handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget && this.modal) {
      this._requestClose();
    }
  }

  render() {
    return html`
      <div 
        class="backdrop ${!this.modal ? 'non-modal' : ''}" 
        @click=${this._handleBackdropClick}
      >
        <div 
          class="dialog-content" 
          role="dialog" 
          aria-modal=${this.modal}
          tabindex="-1"
        >
          <button class="close-button" @click=${this._requestClose} aria-label="Close dialog">&times;</button>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'biz-dialog': BizDialog;
  }
}
