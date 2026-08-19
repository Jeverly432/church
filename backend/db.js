const { Pool } = require('pg');
const { databaseUrl } = require('./config');

const pool = new Pool({
  connectionString: databaseUrl,
});

const query = (text, params) => pool.query(text, params);

const initDb = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL DEFAULT 'admin',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS news (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      tag VARCHAR(100) NOT NULL DEFAULT '',
      body TEXT NOT NULL DEFAULT '',
      published_at DATE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS news_photos (
      id SERIAL PRIMARY KEY,
      news_id INTEGER NOT NULL REFERENCES news(id) ON DELETE CASCADE,
      path VARCHAR(500) NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS documents (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      path VARCHAR(500) NOT NULL,
      pinned BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS leaders (
      id SERIAL PRIMARY KEY,
      slug VARCHAR(120) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      bio_title VARCHAR(255) NOT NULL DEFAULT '',
      bio TEXT[] NOT NULL DEFAULT '{}',
      portrait VARCHAR(500),
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await query(`
    CREATE TABLE IF NOT EXISTS leader_photos (
      id SERIAL PRIMARY KEY,
      leader_id INTEGER NOT NULL REFERENCES leaders(id) ON DELETE CASCADE,
      path VARCHAR(500) NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
};

module.exports = {
  pool,
  query,
  initDb,
};
