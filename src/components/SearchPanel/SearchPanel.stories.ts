import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { SearchPanel, type SearchPanelProps } from './SearchPanel';

const meta: Meta<SearchPanelProps> = {
  title: 'Components/SearchPanel',
  render: (args) => SearchPanel({
    ...args,
    children: html`
      <div style="padding: 10px;">
        <label>Search Term: </label>
        <input type="text" placeholder="Enter keyword...">
      </div>
    `
  }),
};

export default meta;
type Story = StoryObj<SearchPanelProps>;

export const Expanded: Story = {
  args: {
    expanded: true,
  },
};
