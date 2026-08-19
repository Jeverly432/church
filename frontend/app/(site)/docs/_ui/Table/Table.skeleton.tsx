'use client';

import { DownloadDoc } from '@/shared/assets/icons';
import { Skeleton } from '@/shared';
import { Table as AntdTable } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import cn from 'classnames';
import styles from './Table.module.scss';

const titleWidths = ['w-24', 'w-[40%]', 'w-48', 'w-52'];

const skeletonRows = titleWidths.map((width, id) => ({ id, width }));

const skeletonColumns: ColumnsType<(typeof skeletonRows)[number]> = [
  {
    dataIndex: 'width',
    key: 'title',
    render: (width: string) => (
      <div className='flex items-center justify-between gap-4'>
        <Skeleton className={cn('h-5 rounded', width)} />
      </div>
    ),
  },
  {
    key: 'download',
    width: 334,
    render: () => (
      <div className='flex w-full items-center justify-center gap-2 h-8'>
        <Skeleton className='h-3 w-16 rounded' />
        <DownloadDoc className='text-main-green' />
      </div>
    ),
  },
];

export const TableSkeleton = () => {
  return (
    <AntdTable
      rowKey='id'
      dataSource={skeletonRows}
      columns={skeletonColumns}
      pagination={false}
      showHeader={false}
      className={styles.table}
    />
  );
};
