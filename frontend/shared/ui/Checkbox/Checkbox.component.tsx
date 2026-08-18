'use client';

import { Checkbox as AntdCheckbox, type CheckboxProps, type CheckboxRef } from 'antd';
import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './Checkbox.module.scss';

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(({ className, ...props }, ref) => {
  return <AntdCheckbox ref={ref} className={cn(styles.checkbox, className)} {...props} />;
});

Checkbox.displayName = 'Checkbox';
