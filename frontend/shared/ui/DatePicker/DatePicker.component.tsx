'use client';

import { DatePicker as AntdDatePicker, type DatePickerProps } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import cn from 'classnames';
import { forwardRef, type ComponentRef } from 'react';
import styles from './DatePicker.module.scss';

type DatePickerRef = ComponentRef<typeof AntdDatePicker>;

export const DatePicker = forwardRef<DatePickerRef, DatePickerProps>(
  ({ className, classNames, size = 'large', format = 'DD.MM.YYYY', ...props }, ref) => {
    return (
      <AntdDatePicker
        ref={ref}
        size={size}
        format={format}
        locale={locale}
        className={cn(styles.picker, className)}
        {...props}
        classNames={(info) => {
          const resolved = typeof classNames === 'function' ? classNames(info) : classNames;
          const popup = typeof resolved?.popup === 'string' ? { root: resolved.popup } : resolved?.popup;

          return {
            ...resolved,
            popup: {
              ...(typeof popup === 'object' && popup ? popup : {}),
              root: cn(styles.popup, typeof popup === 'object' ? popup?.root : popup),
            },
          };
        }}
      />
    );
  },
);

DatePicker.displayName = 'DatePicker';
