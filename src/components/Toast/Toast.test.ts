import { expect, test, describe } from 'vitest';
 import { render } from 'lit';
 import { ToastManager } from './Toast';
 import type { ToastProps } from './Toast';

describe('Toast', () => {
  test('알림 메시지가 렌더링되어야 함', () => {
    const toasts: ToastProps = {toasts: [{ id: 1, message: 'Alert', type: 'info' }]};
    const container = document.createElement('div');
    render(ToastManager(toasts), container);
    expect(container.textContent).toContain('Alert');
  });
});