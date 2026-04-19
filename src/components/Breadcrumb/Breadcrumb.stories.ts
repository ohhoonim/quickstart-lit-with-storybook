import type { Meta, StoryObj } from '@storybook/web-components';
import { Breadcrumb, type BreadcrumbProps } from './Breadcrumb';

const meta: Meta<BreadcrumbProps> = {
  title: 'Components/Breadcrumb',
  render: (args) => Breadcrumb(args),
};

export default meta;
type Story = StoryObj<BreadcrumbProps>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Library', href: '/library' },
      { label: 'Data' }
    ],
  },
};
