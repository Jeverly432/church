require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  mailHost: process.env.MAIL_HOST,
  mailPort: Number(process.env.MAIL_PORT || 465),
  mailSecure: process.env.MAIL_SECURE !== 'false',
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  mailTo: process.env.MAIL_TO || process.env.MAIL_USER,
};
