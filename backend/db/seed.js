const bcrypt = require('bcrypt');
const { query } = require('../db');
const { adminEmail, adminPassword } = require('../config');

const seedAdmin = async () => {
  if (!adminEmail || !adminPassword) {
    console.warn('ADMIN_EMAIL or ADMIN_PASSWORD is not set, skip admin seed');
    return;
  }

  const { rows } = await query('SELECT id FROM users WHERE email = $1', [adminEmail.toLowerCase()]);

  if (rows.length > 0) {
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await query('INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3)', [
    adminEmail.toLowerCase(),
    passwordHash,
    'admin',
  ]);

  console.log(`Admin user seeded: ${adminEmail.toLowerCase()}`);
};

module.exports = { seedAdmin };
