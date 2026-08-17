import { type ButtonProps as ButtonPropsAnt } from 'antd';

export interface IButtonProps extends Omit<ButtonPropsAnt, 'variant'> {
  variant?: Exclude<NonNullable<ButtonPropsAnt['variant']>, 'dashed' | 'text' | 'link'>;
}
