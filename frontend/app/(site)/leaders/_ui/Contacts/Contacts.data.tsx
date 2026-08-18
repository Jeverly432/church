import type { ColumnsType } from 'antd/es/table';
import { ContactRow } from './Contacts.types';

export const contactsData: ContactRow[] = [
  {
    key: '1',
    description: 'Председатель - иерей Симеон Плугарь',
    phone: '+7 (924) 348-88-49',
  },
  {
    key: '2',
    description: 'Руководитель административно-финансового отдела - Хомич Егор Андреевич',
    phone: '+7 (4162) 21-11-97',
  },
  {
    key: '3',
    description: 'Руководитель отдела по связям с общественностью - Манойло Анастасия Сергеевна',
    phone: '',
  },
  {
    key: '4',
    description: 'Руководитель социального отдела - Елькина Юлия Александровна',
    phone: '',
  },
  {
    key: '5',
    description: 'Руководитель культурного отдела - Кулинченко Валерия Сергеевна',
    phone: '',
  },
];

export const columns: ColumnsType<ContactRow> = [
  {
    dataIndex: 'description',
    key: 'description',
  },
  {
    dataIndex: 'phone',
    key: 'phone',
    align: 'center',
    onCell: (_, index) => {
      if (index === 0) {
        return {};
      }

      if (index === 1) {
        return { rowSpan: 4 };
      }

      return { rowSpan: 0 };
    },
    render: (phone: string) => (phone ? <a href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</a> : '-'),
  },
];
