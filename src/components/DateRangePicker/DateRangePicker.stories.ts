import type { Meta, StoryObj } from '@storybook/web-components';
import { DateRangePicker, type DateRangePickerProps } from './DateRangePicker';

const meta: Meta<DateRangePickerProps> = {
  title: 'Components/DateRangePicker',
  render: (args) => DateRangePicker(args),
};

export default meta;
type Story = StoryObj<DateRangePickerProps>;

export const Default: Story = {
  args: {
    startDate: '2026-04-18',
    endDate: '2026-04-25',
  },
};
