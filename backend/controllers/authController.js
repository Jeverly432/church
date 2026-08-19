const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { query } = require('../db');
const { jwtSecret, jwtExpiresIn } = require('../config');

class AuthController {
  async login(req, res) {
    try {
      const email = String(req.body?.email || '')
        .trim()
        .toLowerCase();
      const password = String(req.body?.password || '');

      if (!email || !password) {
        return res.status(400).json({ message: 'Нужны логин и пароль' });
      }

      const { rows } = await query('SELECT id, email, password_hash, role FROM users WHERE email = $1', [email]);
      const user = rows[0];

      if (!user) {
        return res.status(401).json({ message: 'Неверный логин или пароль' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password_hash);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Неверный логин или пароль' });
      }

      const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, jwtSecret, {
        expiresIn: jwtExpiresIn,
      });

      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (e) {
      console.error('Login error:', e);
      return res.status(500).json({ message: 'Ошибка входа' });
    }
  }

  async me(req, res) {
    try {
      const { rows } = await query('SELECT id, email, role, created_at FROM users WHERE id = $1', [req.user.id]);
      const user = rows[0];

      if (!user) {
        return res.status(401).json({ message: 'Нужна авторизация' });
      }

      return res.json({ user });
    } catch (e) {
      console.error('Me error:', e);
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = new AuthController();
