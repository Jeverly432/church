import type { ColumnsType } from 'antd/es/table';
import { RequisiteRow } from './Table.types';

export const requisitesData: RequisiteRow[] = [
  {
    key: '1',
    label: 'Получатель',
    value: 'АООО «Братство православной молодёжи святого благоверного князя Александра Невского»',
  },
  {
    key: '2',
    label: 'ИНН',
    value: '2801160867',
  },
  {
    key: '3',
    label: 'КПП',
    value: '280101001',
  },
  {
    key: '4',
    label: 'БАНК',
    value: 'ДАЛЬНЕВОСТОЧНЫЙ БАНК ПАО СБЕРБАНК Г. ХАБАРОВСК',
  },
  {
    key: '5',
    label: 'БИК',
    value: '040813608',
  },
  {
    key: '6',
    label: 'К/С',
    value: '30101810600000000608',
  },
  {
    key: '7',
    label: 'Р/С',
    value: '40703810403000000394',
  },
  {
    key: '8',
    label: 'Назначение платежа',
    value: 'Пожертвование на уставную деятельность',
  },
];

export const columns: ColumnsType<RequisiteRow> = [
  {
    dataIndex: 'label',
    key: 'label',
    width: '30%',
    render: (label: string) => <span className='text-[14px] leading-5 text-[#3E3E3E]'>{label}</span>,
  },
  {
    dataIndex: 'value',
    key: 'value',
    render: (value: string) => <span className='text-[14px] leading-4 text-black'>{value}</span>,
  },
];
