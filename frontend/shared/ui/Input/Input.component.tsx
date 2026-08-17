import { Input as AntdInput, type InputProps } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import cn from 'classnames';
import styles from './Input.module.scss';

const InputInner = ({ className, size = 'large', ...props }: InputProps) => {
  return <AntdInput size={size} className={cn(styles.input, className)} {...props} />;
};

const TextArea = ({ className, ...props }: TextAreaProps) => {
  return (
    <AntdInput.TextArea className={cn(styles.input, className)} classNames={{ textarea: styles.textarea }} {...props} />
  );
};

export const Input = Object.assign(InputInner, { TextArea });
