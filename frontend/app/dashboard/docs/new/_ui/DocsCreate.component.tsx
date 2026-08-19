'use client';

import Link from 'next/link';
import { Button, Checkbox, Input, Upload } from '@/shared';
import { Routes } from '@/shared/utils';
import { Form, message, type FormProps, type UploadFile } from 'antd';
import { useDocsStore } from '@/shared/store/docs';
import { useAuthStore } from '@/shared/store/auth';
import { useRouter } from 'next/navigation';

type DocsForm = {
  title: string;
  file: UploadFile[];
  pinned?: boolean;
};

export const DocsCreate = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const token = useAuthStore((state) => state.token);
  const addDocument = useDocsStore((state) => state.addDocument);
  const isLoading = useDocsStore((state) => state.isLoading);

  const onFinish: FormProps<DocsForm>['onFinish'] = async (values) => {
    const file = values.file?.[0]?.originFileObj;

    if (!token || !file) {
      return;
    }

    try {
      await addDocument(token, {
        title: values.title,
        pinned: Boolean(values.pinned),
        file,
      });
      router.replace(Routes.DashboardDocs);
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : 'Не удалось сохранить документ');
    }
  };

  return (
    <section className='flex flex-col gap-6 p-6'>
      {contextHolder}
      <div className='flex items-center justify-between gap-4'>
        <h1 className='text-[32px] leading-11 font-balkara text-black'>Новый документ</h1>
        <Link href={Routes.DashboardDocs}>
          <Button type='default'>К списку</Button>
        </Link>
      </div>
      <div className='flex flex-col gap-5 rounded-xl bg-main-gray p-5'>
        <Form<DocsForm> layout='vertical' onFinish={onFinish} name='doc-add' requiredMark={false} disabled={isLoading}>
          <Form.Item label='Название' rules={[{ message: '', required: true }]} className='mb-2!' name='title'>
            <Input placeholder='Устав' />
          </Form.Item>
          <Form.Item
            label='Файл'
            name='file'
            valuePropName='fileList'
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            className='mb-2!'
            rules={[
              {
                validator: (_, fileList) => {
                  if (!fileList?.length) {
                    return Promise.reject('');
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <Upload maxCount={1} accept='.pdf,.doc,.docx,.xls,.xlsx,.odt,.rtf' beforeUpload={() => false} />
          </Form.Item>
          <Form.Item className='mb-2!' name='pinned' valuePropName='checked'>
            <Checkbox>Закрепить документ</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button size='large' htmlType='submit' loading={isLoading}>
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};
