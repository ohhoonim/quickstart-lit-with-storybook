import type { Meta, StoryObj } from '@storybook/web-components';
import { ComboBox, type ComboBoxProps } from './ComboBox';

const meta: Meta<ComboBoxProps> = {
  title: 'Components/ComboBox',
  render: (args) => ComboBox(args),
};

export default meta;
type Story = StoryObj<ComboBoxProps>;

export const Default: Story = {
  args: {
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' }
    ],
    placeholder: 'Select an option...',
    searchable: true,
  },
};
