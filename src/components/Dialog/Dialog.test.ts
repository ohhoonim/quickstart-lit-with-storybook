import { expect, test, describe } from 'vitest';
 import { render, html } from 'lit';
 import { Dialog } from './Dialog';

describe('Dialog', () => {
  test('open 상태일 때 보여야 함', () => {
    const container = document.createElement('div');
    render(Dialog({ open: true, children: html`<span>Test</span>` }), container);
    expect(container.querySelector('.backdrop')?.classList.contains('open')).toBe(true);
    expect(container.textContent).toContain('Test');
  });
});