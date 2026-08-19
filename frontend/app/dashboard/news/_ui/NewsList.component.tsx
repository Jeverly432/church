'use client';

import { Link } from '@/shared';
import { Routes } from '@/shared/utils';
import { useNewsStore } from '@/shared/store/news';
import { Table as AntdTable } from 'antd';
import { useEffect } from 'react';
import { columns } from './NewsList.columns';
import styles from './NewsList.module.scss';

export const NewsList = () => {
  const news = useNewsStore((state) => state.news);
  const getNews = useNewsStore((state) => state.getNews);
  const isLoading = useNewsStore((state) => state.isLoading);
  const hasFetchedNews = useNewsStore((state) => state.hasFetchedNews);

  useEffect(() => {
    void getNews();
  }, [getNews]);

  const isEmpty = hasFetchedNews && !isLoading && news.length === 0;

  return (
    <section className='flex flex-col gap-6 p-6'>
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-[32px] leading-11 font-balkara text-black'>Новости</h1>
        <Link href={Routes.DashboardNewsCreate} variant='primary'>
          Добавить новость
        </Link>
      </div>
      {isEmpty ? (
        <div className='flex flex-col items-center justify-center gap-4 rounded-xl bg-main-gray px-6 py-16 text-center'>
          <p className='text-[32px] leading-11 font-balkara text-black'>Пока пусто</p>
          <p className='max-w-105 text-[16px] leading-5.5 text-main-gray-hover'>
            Добавьте первую новость — её увидят на сайте. Можно выбрать тег и прикрепить фото.
          </p>
          <Link href={Routes.DashboardNewsCreate} variant='primary' size='large'>
            Добавить новость
          </Link>
        </div>
      ) : (
        <AntdTable
          rowKey='id'
          dataSource={news}
          columns={columns}
          pagination={false}
          showHeader={false}
          loading={{
            spinning: isLoading || !hasFetchedNews,
            indicator: <span className={styles.loader} />,
          }}
          locale={{ emptyText: isLoading ? <div className={styles.emptyPlaceholder} /> : undefined }}
          className={styles.table}
        />
      )}
    </section>
  );
};
