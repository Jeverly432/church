'use client';

import { Button, DatePicker, Input, Link, Select, Upload } from '@/shared';
import { Routes } from '@/shared/utils';
import { useNewsStore } from '@/shared/store/news';
import { useAuthStore } from '@/shared/store/auth';
import { Form, message, type FormProps, type UploadFile } from 'antd';
import type { Dayjs } from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type NewsForm = {
  title: string;
  date: Dayjs;
  tag: string;
  text: string;
  photos?: UploadFile[];
};

export const NewsCreate = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const token = useAuthStore((state) => state.token);
  const getTags = useNewsStore((state) => state.getTags);
  const tags = useNewsStore((state) => state.tags);
  const isLoading = useNewsStore((state) => state.isLoading);
  const createNews = useNewsStore((state) => state.createNews);

  useEffect(() => {
    void getTags();
  }, [getTags]);

  const tagOptions = tags.filter((tag) => tag.id !== 'all').map((tag) => ({ value: tag.id, label: tag.title }));

  const onFinish: FormProps<NewsForm>['onFinish'] = async (values) => {
    if (!token) {
      return;
    }

    try {
      await createNews(token, {
        title: values.title,
        tag: values.tag,
        text: values.text,
        date: values.date.format('YYYY-MM-DD'),
        photos: values.photos?.flatMap((file) => (file.originFileObj ? [file.originFileObj] : [])),
      });
      router.replace(Routes.DashboardNews);
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : 'Не удалось сохранить новость');
    }
  };

  return (
    <section className='flex flex-col gap-6 p-6'>
      {contextHolder}
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-[32px] leading-11 font-balkara text-black'>Новая новость</h1>
        <Link href={Routes.DashboardNews} variant='default'>
          К списку
        </Link>
      </div>
      <div className='flex flex-col gap-5 rounded-xl bg-main-gray p-5'>
        <Form<NewsForm> layout='vertical' requiredMark={false} name='news-add' disabled={isLoading} onFinish={onFinish}>
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
              Опубликовать
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};
