import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Dialog, type DialogProps } from './Dialog';

const meta: Meta<DialogProps> = {
  title: 'Components/Dialog',
  render: (args) => Dialog({
    ...args,
    children: html`
      <h3>Dialog Content</h3>
      <p>This is a modal dialog content.</p>
      <button>Focusable Item</button>
    `
  }),
};

export default meta;
type Story = StoryObj<DialogProps>;

export const Open: Story = {
  args: {
    open: true,
    modal: true,
  },
};
