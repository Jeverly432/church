require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { port, databaseUrl, jwtSecret } = require('./config');
const { initDb } = require('./db');
const { seedAdmin } = require('./db/seed');
const authRouter = require('./routes/authRouter');
const newsRouter = require('./routes/newsRouter');
const docsRouter = require('./routes/docsRouter');
const leadersRouter = require('./routes/leadersRouter');
const feedbackRouter = require('./routes/feedbackRouter');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
const uploadsDir = path.join(__dirname, 'uploads');

app.use(
  '/uploads/docs',
  express.static(path.join(uploadsDir, 'docs'), {
    setHeaders: (res, filePath) => {
      res.setHeader('Content-Disposition', `attachment; filename="${path.basename(filePath)}"`);
    },
  }),
);
app.use('/uploads', express.static(uploadsDir));
app.use('/api/auth', authRouter);
app.use('/api/news', newsRouter);
app.use('/api/docs', docsRouter);
app.use('/api/leaders', leadersRouter);
app.use('/api/feedback', feedbackRouter);

app.use((err, _req, res, _next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'Файл слишком большой' });
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    return res.status(400).json({ message: 'Слишком много файлов' });
  }

  if (err.message) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Ошибка сервера' });
});

const start = async () => {
  try {
    if (!databaseUrl) {
      throw new Error('В .env не задан DATABASE_URL');
    }

    if (!jwtSecret) {
      throw new Error('В .env не задан JWT_SECRET');
    }

    await initDb();
    await seedAdmin();
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (e) {
    console.error('Ошибка запуска сервера:', e.message);
    process.exit(1);
  }
};

start();
