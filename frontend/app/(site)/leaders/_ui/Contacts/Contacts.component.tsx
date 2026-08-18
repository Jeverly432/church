'use client';
import { Table } from 'antd';
import { contactsData, columns } from './Contacts.data';
import styles from './Contacts.module.scss';

export const Contacts = () => {
  return (
    <section className='pt-18.5 pb-20'>
      <div className='container'>
        <div>
          <h2 className='max-w-220 text-[32px] leading-11 font-balkara text-black mb-5'>контактная информация</h2>
          <Table
            dataSource={contactsData}
            columns={columns}
            pagination={false}
            showHeader={false}
            className={styles.table}
          />
        </div>
      </div>
    </section>
  );
};
