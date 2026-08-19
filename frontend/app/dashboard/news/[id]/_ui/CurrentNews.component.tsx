'use client';

import { Button, DatePicker, Input, Link, Select, Upload } from '@/shared';
import { Routes } from '@/shared/utils';
import { useNewsStore } from '@/shared/store/news';
import { Form, FormProps, message, type UploadFile } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './CurrentNews.module.scss';
import { useAuthStore } from '@/shared/store/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type NewsForm = {
  title: string;
  date: Dayjs;
  tag: string;
  text: string;
  photos?: UploadFile[];
};

export const CurrentNews = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const currentNews = useNewsStore((state) => state.currentNews);
  const getCurrentNews = useNewsStore((state) => state.getCurrentNews);
  const getTags = useNewsStore((state) => state.getTags);
  const updateNews = useNewsStore((state) => state.updateNews);
  const tags = useNewsStore((state) => state.tags);
  const isFetching = useNewsStore((state) => state.isFetching);
  const fetchedId = useNewsStore((state) => state.fetchedId);
  const isLoading = useNewsStore((state) => state.isLoading);
  const params = useParams();
  const id = Number(params.id);
  const showLoader = isFetching || fetchedId !== id;
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    void getTags();
    void getCurrentNews(id);
  }, [getCurrentNews, getTags, id]);

  const tagOptions = tags.filter((tag) => tag.id !== 'all').map((tag) => ({ value: tag.id, label: tag.title }));

  const onFinish: FormProps<NewsForm>['onFinish'] = async (values: NewsForm) => {
    if (!token) {
      return;
    }
    try {
      await updateNews(token, id, {
        tag: values.tag,
        title: values.title,
        text: values.text,
        date: values.date.format('YYYY-MM-DD'),
        photos: values.photos?.flatMap((file) => (file.originFileObj ? [file.originFileObj] : [])),
        removePhotoIds: currentNews?.photos
          .map((photo) => photo.id)
          .filter((photoId) => !values.photos?.some((file) => file.uid === String(photoId) && !file.originFileObj)),
      });
      router.replace(Routes.DashboardNews);
    } catch (e) {
      messageApi.error(e instanceof Error ? e.message : 'Не удалось сохранить новость');
    }
  };

  return (
    <section className='flex flex-col gap-6 p-6'>
      {contextHolder}
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-[32px] leading-11 font-balkara text-black'>Редактировать новость</h1>
        <Link href={Routes.DashboardNews} variant='default'>
          К списку
        </Link>
      </div>
      <div className='flex flex-col gap-5 rounded-xl bg-main-gray p-5'>
        {showLoader ? (
          <div className='flex min-h-40 items-center justify-center'>
            <span className={styles.loader} />
          </div>
        ) : !currentNews ? (
          <p className='py-10 text-center text-[16px] leading-5.5 text-main-gray-hover'>Новость не найдена</p>
        ) : (
          <Form
            key={currentNews.id}
            layout='vertical'
            requiredMark={false}
            name='news-edit'
            disabled={isLoading}
            initialValues={{
              title: currentNews.title,
              tag: currentNews.tag?.id,
              date: currentNews.date ? dayjs(currentNews.date) : undefined,
              text: currentNews.text,
              photos: currentNews.photos.map((photo) => ({
                uid: String(photo.id),
                name: photo.url.split('/').pop() || 'photo',
                status: 'done',
                url: `${API_URL}${photo.url}`,
              })),
            }}
            onFinish={onFinish}
          >
            <Form.Item name='title' label='Заголовок' className='mb-2!' rules={[{ required: true, message: '' }]}>
              <Input placeholder='Название новости' />
            </Form.Item>
            <div className='flex gap-4'>
              <Form.Item
                name='tag'
                label='Тег'
                className='mb-2! min-w-50 flex-1'
                rules={[{ required: true, message: '' }]}
              >
                <Select placeholder='Тег' options={tagOptions} />
              </Form.Item>
              <Form.Item
                name='date'
                label='Дата'
                className='mb-2! min-w-50 flex-1'
                rules={[{ required: true, message: '' }]}
              >
                <DatePicker placeholder='Выберите дату' />
              </Form.Item>
            </div>
            <Form.Item name='text' label='Текст' className='mb-2!' rules={[{ required: true, message: '' }]}>
              <Input.TextArea placeholder='Текст новости' rows={6} />
            </Form.Item>
            <Form.Item
              label='Фотографии'
              name='photos'
              valuePropName='fileList'
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              className='mb-2!'
            >
              <Upload maxCount={10} accept='.jpg,.jpeg,.png,.webp' beforeUpload={() => false} />
            </Form.Item>
            <Form.Item>
              <Button size='large' htmlType='submit' loading={isLoading}>
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </section>
  );
};
