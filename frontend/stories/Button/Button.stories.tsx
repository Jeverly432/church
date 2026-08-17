import { Button, IButtonProps } from '@/shared/ui';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FC } from 'react';

import { fn } from 'storybook/test';

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: FC<IButtonProps> = () => {
  return <Button type='primary'>Button</Button>;
};
