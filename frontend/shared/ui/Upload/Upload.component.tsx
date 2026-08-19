'use client';

import AntdUpload from 'antd/es/upload';
import type { UploadFile, UploadProps } from 'antd/es/upload';
import { Image } from 'antd';
import cn from 'classnames';
import { useState } from 'react';
import styles from './Upload.module.scss';

const isImageFile = (file: UploadFile) => {
  if (file.type?.startsWith('image/')) {
    return true;
  }

  const name = file.name || file.url || '';
  return /\.(jpe?g|png|webp|gif)$/i.test(name);
};

const toPreviewSrc = (file: UploadFile) =>
  new Promise<string>((resolve, reject) => {
    if (file.url || file.preview) {
      resolve(String(file.url || file.preview));
      return;
    }

    const source = file.originFileObj;

    if (!source) {
      reject(new Error('No file'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(source);
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
  });

export const Upload = ({
  className,
  children,
  listType = 'picture-card',
  fileList,
  maxCount,
  onPreview,
  ...props
}: UploadProps) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const isMax = maxCount !== undefined && (fileList?.length ?? 0) >= maxCount;

  const handlePreview: UploadProps['onPreview'] = async (file) => {
    if (onPreview) {
      onPreview(file);
      return;
    }

    if (!isImageFile(file)) {
      return;
    }

    const src = await toPreviewSrc(file);
    setPreviewImage(src);
    setPreviewOpen(true);
  };

  return (
    <>
      <AntdUpload
        className={cn(styles.upload, isMax && styles.max, className)}
        listType={listType}
        fileList={fileList}
        maxCount={maxCount}
        onPreview={handlePreview}
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
      {previewImage ? (
        <Image
          styles={{ root: { display: 'none' } }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
          alt=''
        />
      ) : null}
    </>
  );
};
