'use client';

import AntdUpload from 'antd/es/upload';
import type { UploadProps } from 'antd/es/upload';
import cn from 'classnames';
import styles from './Upload.module.scss';

export const Upload = ({ className, children, listType = 'picture-card', ...props }: UploadProps) => {
  return (
    <AntdUpload className={cn(styles.upload, className)} listType={listType} {...props}>
      {children ?? (
        <button type='button' className={styles.trigger}>
          <span className={styles.plus}>+</span>
          <span>Загрузить</span>
        </button>
      )}
    </AntdUpload>
  );
};
