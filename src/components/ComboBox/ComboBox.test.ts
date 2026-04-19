 import { expect, test, describe, vi } from 'vitest';
 import { render } from 'lit';
 import { ComboBox } from './ComboBox';

 describe('ComboBox', () => {
   test('옵션이 있을 때 입력창과 드롭다운을 렌더링해야 함', () => {
     const options = [{ label: 'A', value: '1' }];
     const container = document.createElement('div');
     render(ComboBox({ options, isOpen: true }), container);
     expect(container.querySelector('.dropdown')?.classList.contains('open')).toBe(true);
     expect(container.textContent).toContain('A');
   });
 });