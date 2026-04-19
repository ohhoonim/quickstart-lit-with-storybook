import { expect, test, describe } from 'vitest';
 import { render } from 'lit';
 import { TabNavigator } from './TabNavigator';

describe('TabNavigator', () => {
  test('탭 제목이 정확히 렌더링되어야 함', () => {
    const tabs = [{ id: '1', title: 'Test Tab' }];
    const container = document.createElement('div');
    render(TabNavigator({ tabs }), container);
    expect(container.textContent).toContain('Test Tab');
  });
});