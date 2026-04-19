import type { Meta, StoryObj } from '@storybook/web-components';
import { ToastManager, type ToastProps } from './Toast';

const meta: Meta<ToastProps> = {
  title: 'Components/Toast',
  render: (args) => ToastManager(args),
};

export default meta;
type Story = StoryObj<ToastProps>;

export const Multiple: Story = {
  args: {
    toasts: [
      { id: 1, message: 'Success Message', type: 'success' },
      { id: 2, message: 'Error Message', type: 'error' },
      { id: 3, message: 'Info Message', type: 'info' }
    ],
  },
};
