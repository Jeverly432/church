require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { port, databaseUrl, jwtSecret } = require('./config');
const { initDb } = require('./db');
const { seedAdmin } = require('./db/seed');
const authRouter = require('./routes/authRouter');
const newsRouter = require('./routes/newsRouter');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/auth', authRouter);
app.use('/api/news', newsRouter);

const start = async () => {
  try {
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined in .env');
    }

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in .env');
    }

    await initDb();
    await seedAdmin();
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (e) {
    console.error('Server startup error:', e.message);
    process.exit(1);
  }
};

start();
