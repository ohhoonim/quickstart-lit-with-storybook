import type { Meta, StoryObj } from '@storybook/web-components';
import { DataGrid, type DataGridProps } from './DataGrid';

const meta: Meta<DataGridProps> = {
  title: 'Components/DataGrid',
  render: (args) => DataGrid(args),
};

export default meta;
type Story = StoryObj<DataGridProps>;

export const Default: Story = {
  args: {
    columns: [
      { key: 'id', label: 'ID', sortable: true },
      { key: 'name', label: 'Name', sortable: true },
      { key: 'role', label: 'Role' }
    ],
    data: [
      { id: 1, name: 'John Doe', role: 'Admin' },
      { id: 2, name: 'Jane Smith', role: 'User' },
      { id: 3, name: 'Bob Johnson', role: 'Guest' }
    ],
  },
};
