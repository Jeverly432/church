'use client';

import { Button, Input } from '@/shared';
import { useAuthStore } from '@/shared/store/auth';
import { Routes } from '@/shared/utils';
import { Form, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type LoginForm = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { login, token, hydrated } = useAuthStore();

  useEffect(() => {
    if (hydrated && token) {
      router.replace(Routes.Dashboard);
    }
  }, [hydrated, token, router]);

  const onFinish = async (values: LoginForm) => {
    setIsLoading(true);

    try {
      await login(values.email, values.password);
      router.replace(Routes.Dashboard);
    } catch (error) {
      messageApi.error(error instanceof Error ? error.message : 'Не удалось войти');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Form layout='vertical' requiredMark={false} onFinish={onFinish} disabled={isLoading} className='w-full'>
        <Form.Item label='Логин' name='email' rules={[{ required: true, message: '' }]}>
          <Input placeholder='user' autoComplete='username' />
        </Form.Item>
        <Form.Item label='Пароль' name='password' rules={[{ required: true, message: '' }]}>
          <Input.Password placeholder='password' autoComplete='current-password' size='large' />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' size='large' loading={isLoading} className='w-full'>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
