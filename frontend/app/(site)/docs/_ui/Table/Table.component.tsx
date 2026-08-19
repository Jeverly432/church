'use client';

import { Table as AntdTable } from 'antd';
import { columns } from './Table.data';
import styles from './Table.module.scss';
import { useDocsStore } from '@/shared/store/docs';
import { useEffect } from 'react';
import { TableSkeleton } from './Table.skeleton';

export const Table = () => {
  const documents = useDocsStore((state) => state.documents);
  const hasFetchedDocuments = useDocsStore((state) => state.hasFetchedDocuments);
  const fetchDocs = useDocsStore((state) => state.fetchDocuments);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  return (
    <section className='pt-10 pb-20'>
      <div className='container'>
        <h1 className='text-[46px] font-balkara text-black mb-8'>Документы</h1>
        {!hasFetchedDocuments ? (
          <TableSkeleton />
        ) : (
          <AntdTable
            rowKey='id'
            dataSource={documents}
            columns={columns}
            pagination={false}
            showHeader={false}
            className={styles.table}
          />
        )}
      </div>
    </section>
  );
};
