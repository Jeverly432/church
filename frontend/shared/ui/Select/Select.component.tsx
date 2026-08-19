'use client';

import { Select as AntdSelect, type SelectProps } from 'antd';
import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './Select.module.scss';

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ className, classNames, size = 'large', ...props }, ref) => {
    return (
      <AntdSelect
        ref={ref}
        size={size}
        className={cn(styles.select, className)}
        classNames={{
          ...classNames,
          popup: {
            ...classNames?.popup,
            root: cn(styles.popup, classNames?.popup?.root),
          },
        }}
        {...props}
      />
    );
  },
);

Select.displayName = 'Select';
