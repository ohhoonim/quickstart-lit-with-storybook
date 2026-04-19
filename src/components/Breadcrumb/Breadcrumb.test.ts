import { expect, test, describe } from 'vitest';
 import { render } from 'lit';
 import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  test('올바른 라벨과 링크를 렌더링해야 함', () => {
    const items = [{ label: 'Home', href: '/' }, { label: 'Data' }];
    const container = document.createElement('div');
    render(Breadcrumb({ items }), container);
    
    expect(container.textContent).toContain('Home');
    expect(container.querySelector('a')?.getAttribute('href')).toBe('/');
    expect(container.querySelector('[aria-current="page"]')?.textContent).toBe('Data');
  });
});