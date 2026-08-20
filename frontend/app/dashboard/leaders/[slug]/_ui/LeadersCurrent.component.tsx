'use client';

import { Button, Input, Link, Upload } from '@/shared';
import { Routes } from '@/shared/utils';
import { useLeadersStore } from '@/shared/store/leaders';
import { useAuthStore } from '@/shared/store/auth';
import { Form, message, type FormProps, type UploadFile } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './LeadersCurrent.module.scss';
import { API_URL } from '@/shared/api/client';

const requiredFiles = {
  validator: (_: unknown, fileList: UploadFile[]) => {
    if (!fileList?.length) {
      return Promise.reject('');
    }

    return Promise.resolve();
  },
};

type LeaderForm = {
  name: string;
  title: string;
  slug: string;
  bioTitle: string;
  bio: string;
  portrait?: UploadFile[];
  photos?: UploadFile[];
};

export const LeadersCurrent = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const token = useAuthStore((state) => state.token);
  const currentLeader = useLeadersStore((state) => state.currentLeader);
  const getLeader = useLeadersStore((state) => state.getLeader);
  const updateLeader = useLeadersStore((state) => state.updateLeader);
  const isFetching = useLeadersStore((state) => state.isFetching);
  const fetchedId = useLeadersStore((state) => state.fetchedId);
  const isLoading = useLeadersStore((state) => state.isLoading);
  const params = useParams();
  const slug = String(params.slug);
  const showLoader = isFetching || fetchedId !== slug;

  useEffect(() => {
    void getLeader(slug);
  }, [getLeader, slug]);

  const onFinish: FormProps<LeaderForm>['onFinish'] = async (values) => {
    if (!token) {
      return;
    }

    try {
      await updateLeader(token, slug, {
        name: values.name,
        title: values.title,
        slug: values.slug,
        bioTitle: values.bioTitle,
        bio: values.bio,
        portrait: values.portrait?.find((file) => file.originFileObj)?.originFileObj,
        photos: values.photos?.flatMap((file) => (file.originFileObj ? [file.originFileObj] : [])),
        removePhotoIds: currentLeader?.photos
          .map((photo) => photo.id)
          .filter((photoId) => !values.photos?.some((file) => file.uid === String(photoId) && !file.originFileObj)),
      });
      router.replace(Routes.DashboardLeaders);
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : 'Не удалось сохранить руководителя');
    }
  };

  return (
    <section className='flex flex-col gap-6 p-6'>
      {contextHolder}
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-[32px] leading-11 font-balkara text-black'>Редактировать руководителя</h1>
        <Link href={Routes.DashboardLeaders} variant='default'>
          К списку
        </Link>
      </div>
      <div className='flex flex-col gap-5 rounded-xl bg-main-gray p-5'>
        {showLoader ? (
          <div className='flex min-h-40 items-center justify-center'>
            <span className={styles.loader} />
          </div>
        ) : !currentLeader ? (
          <p className='py-10 text-center text-[16px] leading-5.5 text-main-gray-hover'>Руководитель не найден</p>
        ) : (
          <Form<LeaderForm>
            key={currentLeader.id}
            layout='vertical'
            requiredMark={false}
            name='leader-edit'
            disabled={isLoading}
            onFinish={onFinish}
            initialValues={{
              name: currentLeader.name,
              title: currentLeader.title,
              slug: currentLeader.slug,
              bioTitle: currentLeader.bioTitle,
              bio: currentLeader.bio.join('\n\n'),
              portrait: currentLeader.portrait
                ? [
                    {
                      uid: 'portrait',
                      name: currentLeader.portrait.split('/').pop() || 'portrait',
                      status: 'done',
                      url: `${API_URL}${currentLeader.portrait}`,
                    },
                  ]
                : [],
              photos: currentLeader.photos.map((photo) => ({
                uid: String(photo.id),
                name: photo.url.split('/').pop() || 'photo',
                status: 'done',
                url: `${API_URL}${photo.url}`,
              })),
            }}
          >
            <Form.Item name='name' label='Имя' className='mb-2!' rules={[{ required: true, message: '' }]}>
              <Input placeholder='иерей Симеон Плугарь' />
            </Form.Item>
            <Form.Item name='title' label='Должность' className='mb-2!' rules={[{ required: true, message: '' }]}>
              <Input placeholder='Председатель' />
            </Form.Item>
            <Form.Item
              name='slug'
              label='Slug'
              className='mb-2!'
              getValueFromEvent={(event) =>
                String(event.target.value)
                  .toLowerCase()
                  .replace(/[^a-z0-9-]/g, '')
              }
              rules={[{ required: true, pattern: /^[a-z0-9-]+$/, message: '' }]}
            >
              <Input placeholder='simeon-plugar' />
            </Form.Item>
            <Form.Item
              name='bioTitle'
              label='Заголовок текста'
              className='mb-2!'
              rules={[{ required: true, message: '' }]}
            >
              <Input placeholder='Новый этап развития' />
            </Form.Item>
            <Form.Item name='bio' label='Текст' className='mb-2!' rules={[{ required: true, message: '' }]}>
              <Input.TextArea placeholder='Абзацы разделяйте пустой строкой' rows={8} />
            </Form.Item>
            <div className='mb-4 rounded-xl bg-white p-4'>
              <p className='mb-3 text-[16px] leading-5.5 text-black'>Аватарка</p>
              <Form.Item
                name='portrait'
                valuePropName='fileList'
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                className='mb-0!'
                rules={[requiredFiles]}
              >
                <Upload maxCount={1} accept='.jpg,.jpeg,.png,.webp' beforeUpload={() => false} />
              </Form.Item>
            </div>
            <div className='mb-4 rounded-xl bg-white p-4'>
              <p className='mb-3 text-[16px] leading-5.5 text-black'>Фотогалерея</p>
              <Form.Item
                name='photos'
                valuePropName='fileList'
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                className='mb-0!'
                rules={[requiredFiles]}
              >
                <Upload maxCount={10} accept='.jpg,.jpeg,.png,.webp' beforeUpload={() => false} />
              </Form.Item>
            </div>
            <Form.Item className='mb-0!'>
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
