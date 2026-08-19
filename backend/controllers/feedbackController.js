const { sendMail } = require('../mailer');
const { mailTo } = require('../config');

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

class FeedbackController {
  async send(req, res) {
    try {
      const name = String(req.body?.name || '').trim();
      const phone = String(req.body?.phone || '').trim();
      const text = String(req.body?.desc || req.body?.text || '').trim();

      if (!name || !phone || !text) {
        return res.status(400).json({ message: 'Заполните имя, телефон и сообщение' });
      }

      const subject = `Сообщение с сайта от ${name}`;
      const plain = `Имя: ${name}\nТелефон: ${phone}\n\n${text}`;
      const html = `
        <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
        <p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Сообщение:</strong></p>
        <p>${escapeHtml(text).replace(/\n/g, '<br />')}</p>
      `;

      await sendMail({ to: mailTo, subject, text: plain, html });

      return res.json({ message: 'Сообщение отправлено' });
    } catch (e) {
      console.error('Feedback send error:', e);
      return res.status(500).json({ message: e.message || 'Не удалось отправить сообщение' });
    }
  }
}

module.exports = new FeedbackController();
