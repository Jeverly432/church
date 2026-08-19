import type { ColumnsType } from 'antd/es/table';
import { Pin } from '@/shared/assets/icons';
import type { Document as Doc } from '@/shared/store/docs';
import { Link } from '@/shared';
import { Routes } from '@/shared/utils';

export const columns: ColumnsType<Doc> = [
  {
    dataIndex: 'title',
    key: 'title',
    render: (title: string, item) => (
      <Link
        href={`${Routes.DashboardDocsCurrent(String(item.id))}`}
        className='flex items-center justify-between gap-4 text-black! px-2.5 py-3'
      >
        <span>{title}</span>
        <Pin className={`shrink-0 ${item.pinned ? 'opacity-100' : 'opacity-0'}`} />
      </Link>
    ),
  },
];
