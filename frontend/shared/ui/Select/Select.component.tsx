'use client';

import { Select as AntdSelect, type SelectProps } from 'antd';
import cn from 'classnames';
import { forwardRef, type ComponentRef } from 'react';
import styles from './Select.module.scss';

type SelectRef = ComponentRef<typeof AntdSelect>;

export const Select = forwardRef<SelectRef, SelectProps>(({ className, classNames, size = 'large', ...props }, ref) => {
  return (
    <AntdSelect
      ref={ref}
      size={size}
      className={cn(styles.select, className)}
      {...props}
      classNames={(info) => {
        const resolved = typeof classNames === 'function' ? classNames(info) : classNames;
        const popup = resolved?.popup;

        return {
          ...resolved,
          popup: {
            ...popup,
            root: cn(styles.popup, popup?.root),
          },
        };
      }}
    />
  );
});

Select.displayName = 'Select';
