import { expect, test, describe } from 'vitest';
 import { render, html } from 'lit';
 import { SearchPanel } from './SearchPanel';

describe('SearchPanel', () => {
  test('expanded 상태에 따라 콘텐츠가 보여야 함', () => {
    const container = document.createElement('div');
    render(SearchPanel({ expanded: true, children: html`<span>Content</span>` }), container);
    expect(container.querySelector('.content')).not.toBeNull();
  });
});