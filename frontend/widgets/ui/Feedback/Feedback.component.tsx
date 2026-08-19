'use client';

import { Button, Checkbox, Input } from '@/shared';
import { apiRequest } from '@/shared/api/client';
import { Form, FormProps, message } from 'antd';
import cn from 'classnames';
import styles from './Feedback.module.scss';
import { formatRuPhone, feedbackMessages, validateRuPhone } from './Feedback.data';
import { useState } from 'react';

type FeedbackForm = {
  name: string;
  phone: string;
  desc: string;
  agreement: boolean;
};

export const Feedback = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formKey, setFormKey] = useState(0);

  const onFinish: FormProps<FeedbackForm>['onFinish'] = async (values) => {
    setIsLoading(true);

    try {
      await apiRequest('/api/feedback', {
        method: 'POST',
        body: {
          name: values.name,
          phone: values.phone,
          desc: values.desc,
        },
      });
      setFormKey((key) => key + 1);
      messageApi.success(feedbackMessages.success);
    } catch {
      messageApi.error(feedbackMessages.error);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed: FormProps['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section className='mb-20'>
      {contextHolder}
      <div className='container'>
        <div className='flex justify-between bg-main-gray rounded-xl p-5'>
          <div className='flex flex-col gap-4.5'>
            <h2 className='max-w-220 text-[32px] leading-11 font-balkara text-black'>Оставайтесь на связи с нами!</h2>
            <p className='max-w-139.5 text-[20px] leading-6 text-black'>
              Есть вопросы, предложения или хотите присоединиться к Братству? Напишите нам, и мы обязательно ответим.
            </p>
          </div>
          <Form
            key={formKey}
            name='feedback'
            layout='vertical'
            requiredMark={false}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
            disabled={isLoading}
            className={styles.form}
          >
            <div className='flex flex-wrap gap-3'>
              <Form.Item
                label='Ваше имя'
                name='name'
                className={cn('w-[calc(50%-6px)] m-0!', styles.silent)}
                rules={[{ required: true, message: '' }]}
              >
                <Input placeholder='Иван' />
              </Form.Item>
              <Form.Item
                label='Телефон'
                name='phone'
                className='w-[calc(50%-6px)] m-0!'
                getValueFromEvent={(event) => formatRuPhone(event.target.value)}
                validateTrigger={['onChange', 'onBlur', 'onSubmit']}
                rules={[
                  { required: true, message: '', validateTrigger: 'onSubmit' },
                  { validator: validateRuPhone, validateTrigger: ['onChange', 'onBlur'] },
                ]}
              >
                <Input placeholder='+7 999 777 77 77' inputMode='tel' autoComplete='tel' />
              </Form.Item>
              <Form.Item
                label='Ваш вопрос или сообщение'
                name='desc'
                className={cn('w-full m-0!', styles.silent)}
                rules={[{ required: true, message: '' }]}
              >
                <Input.TextArea placeholder='Что вы хотите нам рассказать?' rows={3} />
              </Form.Item>
            </div>
            <Form.Item
              name='agreement'
              valuePropName='checked'
              className={cn(styles.consent, styles.silent)}
              getValueFromEvent={(event) => event.target.checked}
              rules={[
                {
                  validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error(' '))),
                },
              ]}
            >
              <Checkbox>
                Нажимая на кнопку «Отправить сообщение», подтверждаю своё согласие с положениями Политики
                конфиденциальности и даю согласие на обработку персональных данных
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button size='large' htmlType='submit' loading={isLoading} className='mt-3'>
                Отправить сообщение
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};
