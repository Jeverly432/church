export const formatRuPhone = (value: string) => {
  const digits = value.replace(/\D/g, '');

  if (!digits) {
    return '';
  }

  let rest = digits;
  if (rest.startsWith('8') || rest.startsWith('7')) {
    rest = rest.slice(1);
  }

  rest = rest.slice(0, 10);

  const parts = [rest.slice(0, 3), rest.slice(3, 6), rest.slice(6, 8), rest.slice(8, 10)].filter(Boolean);

  return `+7${parts.length ? ` ${parts.join(' ')}` : ''}`;
};

const ruPhonePattern = /^\+7 \d{3} \d{3} \d{2} \d{2}$/;

export const validateRuPhone = (_: unknown, value?: string) => {
  if (!value) {
    return Promise.resolve();
  }

  if (ruPhonePattern.test(value)) {
    return Promise.resolve();
  }

  return Promise.reject(new Error('Формат: +7 999 777 77 77'));
};

export const feedbackMessages = {
  success: 'Спасибо! Ваше сообщение успешно отправлено.',
  error: 'Что-то пошло не так, попробуйте отправить форму еще раз',
};
