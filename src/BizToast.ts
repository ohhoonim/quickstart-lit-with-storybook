import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

@customElement('biz-toast-item')
export class BizToastItem extends LitElement {
  @property({ type: String }) message = '';
  @property({ type: String }) type: ToastType = 'info';

  static styles = css`
    :host {
      display: block;
      margin-bottom: 8px;
      padding: 12px 16px;
      border-radius: 4px;
      color: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      animation: slideIn 0.3s ease-out;
      min-width: 200px;
      max-width: 400px;
    }

    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    :host([type="success"]) { background-color: #2ecc71; }
    :host([type="error"]) { background-color: #e74c3c; }
    :host([type="warning"]) { background-color: #f1c40f; color: #333; }
    :host([type="info"]) { background-color: #3498db; }
  `;

  render() {
    return html`<div role="alert">${this.message}</div>`;
  }
}

@customElement('biz-toast-manager')
export class BizToastManager extends LitElement {
  @state() private _toasts: ToastMessage[] = [];
  private _nextId = 0;

  static styles = css`
    :host {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 2000;
    }
  `;

  public show(message: string, type: ToastType = 'info', duration = 3000) {
    const id = this._nextId++;
    const toast: ToastMessage = { id, message, type, duration };
    this._toasts = [...this._toasts, toast];

    if (duration > 0) {
      setTimeout(() => {
        this.removeToast(id);
      }, duration);
    }
  }

  public removeToast(id: number) {
    this._toasts = this._toasts.filter(t => t.id !== id);
  }

  render() {
    return html`
      ${repeat(this._toasts, (t) => t.id, (t) => html`
        <biz-toast-item .message=${t.message} .type=${t.type}></biz-toast-item>
      `)}
    `;
  }
}
