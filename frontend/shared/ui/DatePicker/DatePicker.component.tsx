'use client';

import { DatePicker as AntdDatePicker, type DatePickerProps } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './DatePicker.module.scss';

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ className, classNames, size = 'large', format = 'DD.MM.YYYY', ...props }, ref) => {
    const popup = typeof classNames?.popup === 'string' ? { root: classNames.popup } : classNames?.popup;

    return (
      <AntdDatePicker
        ref={ref}
        size={size}
        format={format}
        locale={locale}
        className={cn(styles.picker, className)}
        classNames={{
          ...classNames,
          popup: {
            ...popup,
            root: cn(styles.popup, popup?.root),
          },
        }}
        {...props}
      />
    );
  },
);

DatePicker.displayName = 'DatePicker';
