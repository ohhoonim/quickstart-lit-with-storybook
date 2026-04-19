import { expect, test, describe, vi } from 'vitest';
 import { render } from 'lit';
 import { DateRangePicker } from './DateRangePicker';

describe('DateRangePicker', () => {
  test('날짜 값이 올바르게 바인딩되어야 함', () => {
    const container = document.createElement('div');
    render(DateRangePicker({ startDate: '2026-04-18' }), container);
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('2026-04-18');
  });
});