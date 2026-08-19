'use client';

import { Button, Input, Link, Upload } from '@/shared';
import { Routes } from '@/shared/utils';
import { useLeadersStore } from '@/shared/store/leaders';
import { useAuthStore } from '@/shared/store/auth';
import { Form, message, type FormProps, type UploadFile } from 'antd';
import { useRouter } from 'next/navigation';

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

export const LeadersCreate = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const token = useAuthStore((state) => state.token);
  const isLoading = useLeadersStore((state) => state.isLoading);
  const createLeader = useLeadersStore((state) => state.createLeader);

  const onFinish: FormProps<LeaderForm>['onFinish'] = async (values) => {
    if (!token) {
      return;
    }

    try {
      await createLeader(token, {
        name: values.name,
        title: values.title,
        slug: values.slug,
        bioTitle: values.bioTitle,
        bio: values.bio,
        portrait: values.portrait?.find((file) => file.originFileObj)?.originFileObj,
        photos: values.photos?.flatMap((file) => (file.originFileObj ? [file.originFileObj] : [])),
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
        <h1 className='text-[32px] leading-11 font-balkara text-black'>Новый руководитель</h1>
        <Link href={Routes.DashboardLeaders} variant='default'>
          К списку
        </Link>
      </div>
      <div className='flex flex-col gap-5 rounded-xl bg-main-gray p-5'>
        <Form<LeaderForm>
          layout='vertical'
          requiredMark={false}
          name='leader-add'
          disabled={isLoading}
          onFinish={onFinish}
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
      </div>
    </section>
  );
};
