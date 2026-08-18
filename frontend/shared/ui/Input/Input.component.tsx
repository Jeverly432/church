import AntdInput from 'antd/es/input';
import AntdTextArea from 'antd/es/input/TextArea';
import type { InputProps, TextAreaProps } from 'antd/es/input';
import cn from 'classnames';
import styles from './Input.module.scss';

const InputInner = ({ className, size = 'large', ...props }: InputProps) => {
  return <AntdInput size={size} className={cn(styles.input, className)} {...props} />;
};

const Password = ({ className, size = 'large', ...props }: InputProps) => {
  return <AntdInput.Password size={size} className={cn(styles.input, className)} {...props} />;
};

const TextArea = ({ className, ...props }: TextAreaProps) => {
  return <AntdTextArea className={cn(styles.input, className)} classNames={{ textarea: styles.textarea }} {...props} />;
};

export const Input = Object.assign(InputInner, { TextArea, Password });
