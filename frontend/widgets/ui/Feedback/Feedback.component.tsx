'use client';

import { Button, Input } from '@/shared';
import { Form, FormProps } from 'antd';
import styles from './Feedback.module.scss';

export const Feedback = () => {
  const onFinish = () => {
    console.log('');
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section>
      <div className='container'>
        <div className='flex justify-between bg-main-gray rounded-xl p-5'>
          <div className='flex flex-col gap-4.5'>
            <h2 className='max-w-220 text-[32px] leading-11 font-balkara text-black'>Оставайтесь на связи с нами!</h2>
            <p className='max-w-139.5 text-[20px] leading-6 text-black'>
              Есть вопросы, предложения или хотите присоединиться к Братству? Напишите нам, и мы обязательно ответим.
            </p>
          </div>
          <Form
            name='feedback'
            layout='vertical'
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
            initialValues={{ remember: true }}
            className={styles.form}
            autoComplete='off'
          >
            <div className='flex flex-wrap gap-3'>
              <Form.Item label='Ваше имя' className='w-[calc(50%-6px)] m-0!'>
                <Input placeholder='Иван' required />
              </Form.Item>
              <Form.Item label='Телефон' className='w-[calc(50%-6px)] m-0!'>
                <Input placeholder='Ваш вопрос или сообщение' required />
              </Form.Item>
              <Form.Item label='Ваш вопрос или сообщение' className='w-full m-0!'>
                <Input.TextArea placeholder='Что бы хотите нам рассказать?' rows={3} required />
              </Form.Item>
            </div>
            <Button size='large' className='mt-3'>
              Отправить сообщение
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
};
