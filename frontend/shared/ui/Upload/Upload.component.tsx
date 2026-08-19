'use client';

import AntdUpload from 'antd/es/upload';
import type { UploadProps } from 'antd/es/upload';
import cn from 'classnames';
import styles from './Upload.module.scss';

export const Upload = ({
  className,
  children,
  listType = 'picture-card',
  fileList,
  maxCount,
  ...props
}: UploadProps) => {
  const isMax = maxCount !== undefined && (fileList?.length ?? 0) >= maxCount;

  return (
    <AntdUpload
      className={cn(styles.upload, isMax && styles.max, className)}
      listType={listType}
      fileList={fileList}
      maxCount={maxCount}
      {...props}
    >
      {isMax
        ? null
        : (children ?? (
            <button type='button' className={styles.trigger}>
              <span className={styles.plus}>+</span>
              <span>Загрузить</span>
            </button>
          ))}
    </AntdUpload>
  );
};
