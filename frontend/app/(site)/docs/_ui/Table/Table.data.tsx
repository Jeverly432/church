import type { ColumnsType } from 'antd/es/table';
import { DownloadDoc, Pin } from '@/shared/assets/icons';
import { DocRow } from './Table.types';
import { Button } from '@/shared';

export const docsData: DocRow[] = [
  { key: '1', title: 'Устав', href: '#' },
  { key: '2', title: 'Свидетельство о государственной регистрации', href: '#' },
  { key: '3', title: 'Годовой финансовый отчет за 2024 год', href: '#' },
  { key: '4', title: 'Годовой финансовый отчет за 2025 год', href: '#' },
  { key: '5', title: 'Название документа 5', href: '#' },
  { key: '6', title: 'Название документа 6', href: '#' },
  { key: '7', title: 'Название документа 7', href: '#' },
];

export const columns: ColumnsType<DocRow> = [
  {
    dataIndex: 'title',
    key: 'title',
    render: (title: string) => (
      <div className='flex items-center justify-between gap-4'>
        <span>{title}</span>
        <Pin className='shrink-0 text-[#bfbfbf]' />
      </div>
    ),
  },
  {
    dataIndex: 'href',
    key: 'href',
    width: 334,
    render: (href: string) => (
      <div className='flex w-full h-full'>
        <Button href={href} type='link' className='mx-auto' size='medium'>
          Скачать <DownloadDoc />
        </Button>
      </div>
    ),
  },
];
