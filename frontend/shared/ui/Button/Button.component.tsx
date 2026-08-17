import { Button as AntdButton } from 'antd';
import { FC } from 'react';
import cn from 'classnames';
import styles from './Button.module.scss';
import { IButtonProps } from './Button.types';

export const Button: FC<IButtonProps> = ({ className, type = 'primary', ...props }) => {
  return <AntdButton type={type} className={cn(styles.button, className)} {...props} />;
};
