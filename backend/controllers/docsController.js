const fs = require('fs');
const path = require('path');
const { query } = require('../db');

const mapDoc = (row) => ({
  id: row.id,
  title: row.title,
  url: row.path,
  pinned: Boolean(row.pinned),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const parsePinned = (value, fallback = false) => {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  return value === 'true' || value === '1';
};

const removeFile = (filePath) => {
  if (!filePath) {
    return;
  }

  const absolutePath = path.join(__dirname, '..', filePath.replace(/^\//, ''));

  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
};

class DocsController {
  async list(_req, res) {
    try {
      const { rows } = await query(
        'SELECT * FROM documents ORDER BY pinned DESC, created_at DESC, id DESC',
      );

      return res.json({ documents: rows.map(mapDoc) });
    } catch (e) {
      console.error('Docs list error:', e);
      return res.status(500).json({ message: 'Не удалось получить список документов' });
    }
  }

  async getOne(req, res) {
    try {
      const { rows } = await query('SELECT * FROM documents WHERE id = $1', [req.params.id]);
      const document = rows[0];

      if (!document) {
        return res.status(404).json({ message: 'Документ не найден' });
      }

      return res.json({ document: mapDoc(document) });
    } catch (e) {
      console.error('Docs get error:', e);
      return res.status(500).json({ message: 'Не удалось получить документ' });
    }
  }

  async create(req, res) {
    try {
      const title = String(req.body?.title || '').trim();
      const pinned = parsePinned(req.body?.pinned, false);
      const file = req.file;

      if (!title) {
        return res.status(400).json({ message: 'Нужен заголовок' });
      }

      if (!file) {
        return res.status(400).json({ message: 'Нужен файл' });
      }

      const filePath = `/uploads/docs/${file.filename}`;
      const { rows } = await query(
        'INSERT INTO documents (title, path, pinned) VALUES ($1, $2, $3) RETURNING *',
        [title, filePath, pinned],
      );

      return res.status(201).json({ document: mapDoc(rows[0]) });
    } catch (e) {
      console.error('Docs create error:', e);
      return res.status(500).json({ message: e.message || 'Не удалось загрузить документ' });
    }
  }

  async update(req, res) {
    try {
      const { rows } = await query('SELECT * FROM documents WHERE id = $1', [req.params.id]);
      const current = rows[0];

      if (!current) {
        return res.status(404).json({ message: 'Документ не найден' });
      }

      const title = req.body?.title !== undefined ? String(req.body.title).trim() : current.title;
      const pinned = req.body?.pinned !== undefined ? parsePinned(req.body.pinned, current.pinned) : current.pinned;
      let filePath = current.path;

      if (!title) {
        return res.status(400).json({ message: 'Нужен заголовок' });
      }

      if (req.file) {
        filePath = `/uploads/docs/${req.file.filename}`;
        removeFile(current.path);
      }

      const updated = await query(
        'UPDATE documents SET title = $1, path = $2, pinned = $3, updated_at = NOW() WHERE id = $4 RETURNING *',
        [title, filePath, pinned, current.id],
      );

      return res.json({ document: mapDoc(updated.rows[0]) });
    } catch (e) {
      console.error('Docs update error:', e);
      return res.status(500).json({ message: e.message || 'Не удалось обновить документ' });
    }
  }

  async pin(req, res) {
    try {
      const { rows } = await query('SELECT * FROM documents WHERE id = $1', [req.params.id]);
      const current = rows[0];

      if (!current) {
        return res.status(404).json({ message: 'Документ не найден' });
      }

      const pinned =
        req.body?.pinned !== undefined ? parsePinned(req.body.pinned, !current.pinned) : !current.pinned;

      const updated = await query(
        'UPDATE documents SET pinned = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [pinned, current.id],
      );

      return res.json({ document: mapDoc(updated.rows[0]) });
    } catch (e) {
      console.error('Docs pin error:', e);
      return res.status(500).json({ message: e.message || 'Не удалось закрепить документ' });
    }
  }

  async remove(req, res) {
    try {
      const { rows } = await query('SELECT * FROM documents WHERE id = $1', [req.params.id]);
      const document = rows[0];

      if (!document) {
        return res.status(404).json({ message: 'Документ не найден' });
      }

      await query('DELETE FROM documents WHERE id = $1', [document.id]);
      removeFile(document.path);

      return res.json({ message: 'Документ удалён' });
    } catch (e) {
      console.error('Docs delete error:', e);
      return res.status(500).json({ message: 'Не удалось удалить документ' });
    }
  }
}

module.exports = new DocsController();
