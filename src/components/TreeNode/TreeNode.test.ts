import { expect, test, describe } from 'vitest';
import { render } from 'lit';
import { TreeNode } from './TreeNode';

describe('TreeNode', () => {
  test('노드 라벨이 표시되어야 함', () => {
    const node = { id: '1', label: 'Node Test' };
    const container = document.createElement('div');
    render(TreeNode({ node }), container);
    expect(container.textContent).toContain('Node Test');
  });
});
