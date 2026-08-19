'use client';

import { Link } from '@/shared';
import { Routes } from '@/shared/utils';
import { useDocsStore } from '@/shared/store/docs';
import { Table as AntdTable } from 'antd';
import { useEffect } from 'react';
import { columns } from './DocsList.columns';
import styles from './DocsList.module.scss';

export const DocsList = () => {
  const documents = useDocsStore((state) => state.documents);
  const isLoading = useDocsStore((state) => state.isLoading);
  const hasFetchedDocuments = useDocsStore((state) => state.hasFetchedDocuments);
  const fetchDocs = useDocsStore((state) => state.fetchDocuments);

  useEffect(() => {
    fetchDocs();
  }, [fetchDocs]);

  const isEmpty = hasFetchedDocuments && !isLoading && documents.length === 0;

  return (
    <section className='flex flex-col gap-6 p-6'>
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-[32px] leading-11 font-balkara text-black'>Документы</h1>
        <Link href={Routes.DashboardDocsCreate} variant='primary'>
          Добавить документ
        </Link>
      </div>
      {isEmpty ? (
        <div className='flex flex-col items-center justify-center gap-4 rounded-xl bg-main-gray px-6 py-16 text-center'>
          <p className='text-[32px] leading-11 font-balkara text-black'>Пока пусто</p>
          <p className='max-w-105 text-[16px] leading-5.5 text-main-gray-hover'>
            Загрузите первый документ — устав, отчёт или свидетельство. Его можно будет закрепить вверху списка.
          </p>
          <Link href={Routes.DashboardDocsCreate} variant='primary' size='large'>
            Добавить документ
          </Link>
        </div>
      ) : (
        <AntdTable
          rowKey='id'
          dataSource={documents}
          columns={columns}
          pagination={false}
          showHeader={false}
          loading={{
            spinning: isLoading || !hasFetchedDocuments,
            indicator: <span className={styles.loader} />,
          }}
          locale={{ emptyText: isLoading ? <div className={styles.emptyPlaceholder} /> : undefined }}
          className={styles.table}
        />
      )}
    </section>
  );
};
