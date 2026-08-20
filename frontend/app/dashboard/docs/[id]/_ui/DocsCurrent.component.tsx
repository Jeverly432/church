'use client';

import { Button, Checkbox, Input, Link, Upload } from '@/shared';
import { Routes } from '@/shared/utils';
import { Form, message, UploadFile, type FormProps } from 'antd';
import { useDocsStore } from '@/shared/store/docs';
import { useAuthStore } from '@/shared/store/auth';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './DocsCurrent.module.scss';
import { API_URL } from '@/shared/api/client';

type DocsForm = {
  title: string;
  file: UploadFile[];
  pinned?: boolean;
};

export const DocsCurrent = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const token = useAuthStore((state) => state.token);
  const putDocument = useDocsStore((state) => state.putDocument);
  const isLoading = useDocsStore((state) => state.isLoading);
  const isFetching = useDocsStore((state) => state.isFetching);
  const fetchedId = useDocsStore((state) => state.fetchedId);
  const getDocument = useDocsStore((state) => state.getDocument);
  const currentDocument = useDocsStore((state) => state.currentDocument);
  const params = useParams();
  const id = String(params.id);
  const showLoader = isFetching || fetchedId !== id;

  useEffect(() => {
    getDocument(id);
  }, [getDocument, id]);

  const onFinish: FormProps<DocsForm>['onFinish'] = async (values) => {
    const file = values.file?.[0]?.originFileObj;

    if (!token) {
      return;
    }

    try {
      await putDocument(token, id, {
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
        <h1 className='text-[32px] leading-11 font-balkara text-black'>Редактировать документ</h1>
        <Link href={Routes.DashboardDocs} variant='default'>
          К списку
        </Link>
      </div>
      <div className='flex flex-col gap-5 rounded-xl bg-main-gray p-5'>
        {showLoader ? (
          <div className='flex min-h-40 items-center justify-center'>
            <span className={styles.loader} />
          </div>
        ) : !currentDocument ? (
          <p className='py-10 text-center text-[16px] leading-5.5 text-main-gray-hover'>Документ не найден</p>
        ) : (
          <Form<DocsForm>
            key={currentDocument.id}
            layout='vertical'
            onFinish={onFinish}
            name='doc-edit'
            requiredMark={false}
            disabled={isLoading}
            initialValues={{
              title: currentDocument.title,
              pinned: currentDocument.pinned,
              file: [
                {
                  uid: String(currentDocument.id),
                  name: currentDocument.title,
                  status: 'done',
                  url: `${API_URL}${currentDocument.url}`,
                },
              ],
            }}
          >
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
