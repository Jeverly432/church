'use client';

import { Link } from '@/shared';
import { Routes } from '@/shared/utils';
import { useLeadersStore } from '@/shared/store/leaders';
import { Table as AntdTable } from 'antd';
import { useEffect } from 'react';
import { columns } from './LeadersList.columns';
import styles from './LeadersList.module.scss';

export const LeadersList = () => {
  const leaders = useLeadersStore((state) => state.leaders);
  const fetchLeaders = useLeadersStore((state) => state.fetchLeaders);
  const isLoading = useLeadersStore((state) => state.isLoading);
  const hasFetchedLeaders = useLeadersStore((state) => state.hasFetchedLeaders);

  useEffect(() => {
    void fetchLeaders();
  }, [fetchLeaders]);

  const isEmpty = hasFetchedLeaders && !isLoading && leaders.length === 0;

  return (
    <section className='flex flex-col gap-6 p-6'>
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-[32px] leading-11 font-balkara text-black'>Руководители</h1>
        <Link href={Routes.DashboardLeadersCreate} variant='primary'>
          Добавить
        </Link>
      </div>
      {isEmpty ? (
        <div className='flex flex-col items-center justify-center gap-4 rounded-xl bg-main-gray px-6 py-16 text-center'>
          <p className='text-[32px] leading-11 font-balkara text-black'>Пока пусто</p>
          <p className='max-w-105 text-[16px] leading-5.5 text-main-gray-hover'>
            Добавьте руководителя — имя, должность, фото и текст появятся на сайте.
          </p>
          <Link href={Routes.DashboardLeadersCreate} variant='primary' size='large'>
            Добавить
          </Link>
        </div>
      ) : (
        <AntdTable
          rowKey='id'
          dataSource={leaders}
          columns={columns}
          pagination={false}
          showHeader={false}
          loading={{
            spinning: isLoading || !hasFetchedLeaders,
            indicator: <span className={styles.loader} />,
          }}
          locale={{ emptyText: isLoading ? <div className={styles.emptyPlaceholder} /> : undefined }}
          className={styles.table}
        />
      )}
    </section>
  );
};
