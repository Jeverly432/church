import type { ColumnsType } from 'antd/es/table';
import { DownloadDoc, Pin } from '@/shared/assets/icons';
import { Button } from '@/shared';
import type { Document as Doc } from '@/shared/store/docs';
import { downloadFile } from '@/shared/utils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const columns: ColumnsType<Doc> = [
  {
    dataIndex: 'title',
    key: 'title',
    render: (title: string, item) => (
      <div className='flex items-center justify-between gap-4'>
        <span>{title}</span>
        <Pin className={`shrink-0 ${item.pinned ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    ),
  },
  {
    key: 'download',
    width: 334,
    render: (_value, item) => (
      <div className='flex w-full h-full'>
        <Button
          type='link'
          className='mx-auto'
          size='medium'
          onClick={() => downloadFile(`${API_URL}${item.url}`, item.title)}
        >
          Скачать <DownloadDoc />
        </Button>
      </div>
    ),
  },
];
