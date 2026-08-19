const nodemailer = require('nodemailer');
const { mailHost, mailPort, mailSecure, mailUser, mailPassword } = require('./config');

const createTransport = () => {
  if (!mailHost || !mailUser || !mailPassword) {
    throw new Error('Почта не настроена');
  }

  return nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: mailSecure,
    auth: {
      user: mailUser,
      pass: mailPassword,
    },
  });
};

const sendMail = async ({ to, subject, text, html }) => {
  const transporter = createTransport();

  await transporter.sendMail({
    from: `"Сайт Братства" <${mailUser}>`,
    to,
    subject,
    text,
    html,
  });
};

module.exports = { sendMail };
