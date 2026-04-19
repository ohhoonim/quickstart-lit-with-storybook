import type { Meta, StoryObj } from '@storybook/web-components';
import { TreeNode, type TreeNodeProps } from './TreeNode';

const meta: Meta<TreeNodeProps> = {
  title: 'Components/TreeNode',
  render: (args) => TreeNode(args),
};

export default meta;
type Story = StoryObj<TreeNodeProps>;

export const Recursive: Story = {
  args: {
    node: {
      id: 'root',
      label: 'Root Node',
      expanded: true,
      children: [
        {
          id: 'child1',
          label: 'Child 1',
          expanded: false,
          children: [
            { id: 'grandchild1', label: 'Grandchild 1' }
          ]
        },
        { id: 'child2', label: 'Child 2' }
      ]
    },
  },
};
