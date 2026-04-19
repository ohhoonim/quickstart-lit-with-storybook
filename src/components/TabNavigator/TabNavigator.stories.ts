import type { Meta, StoryObj } from '@storybook/web-components';
import { TabNavigator, type TabNavigatorProps } from './TabNavigator';

const meta: Meta<TabNavigatorProps> = {
  title: 'Components/TabNavigator',
  render: (args) => TabNavigator(args),
};

export default meta;
type Story = StoryObj<TabNavigatorProps>;

export const Default: Story = {
  args: {
    tabs: [
      { id: '1', title: 'Home', pinned: true },
      { id: '2', title: 'Profile' },
      { id: '3', title: 'Settings' }
    ],
    activeTabId: '1',
  },
};
