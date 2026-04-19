import { expect, test, describe, vi } from 'vitest';
 import { render } from 'lit';
 import { DataGrid } from './DataGrid';

describe('DataGrid', () => {
  test('데이터 행이 올바르게 렌더링되어야 함', () => {
    const columns = [{ key: 'name', label: 'Name' }];
    const data = [{ name: 'Test' }];
    const container = document.createElement('div');
    render(DataGrid({ columns, data }), container);
    expect(container.querySelector('td')?.textContent).toBe('Test');
  });
});