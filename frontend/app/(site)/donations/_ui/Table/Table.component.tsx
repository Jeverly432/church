'use client';

import { Table as AntdTable } from 'antd';
import { columns, requisitesData } from './Table.data';
import styles from './Table.module.scss';

export const Table = () => {
  return (
    <section className='pt-10 pb-20'>
      <div className='container'>
        <h1 className='text-[46px] font-balkara text-black mb-8'>Реквизиты</h1>
        <AntdTable
          dataSource={requisitesData}
          columns={columns}
          pagination={false}
          showHeader={false}
          className={styles.table}
        />
      </div>
    </section>
  );
};
