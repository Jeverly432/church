const fs = require('fs');
const path = require('path');
const { NEWS_TAGS, getNewsTag, parseTagId, isAllowedNewsTag } = require('../constants/newsTags');
const { query } = require('../db');

const mapNews = (row, photos = []) => ({
  id: row.id,
  title: row.title,
  tag: getNewsTag(row.tag),
  text: row.body,
  date: row.published_at,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  photos: photos.map((photo) => ({
    id: photo.id,
    url: photo.path,
    sortOrder: photo.sort_order,
  })),
});

const getPhotos = async (newsId) => {
  const { rows } = await query(
    'SELECT id, path, sort_order FROM news_photos WHERE news_id = $1 ORDER BY sort_order ASC, id ASC',
    [newsId],
  );

  return rows;
};

const savePhotos = async (newsId, files = []) => {
  const { rows: lastRows } = await query(
    'SELECT COALESCE(MAX(sort_order), -1) AS last_order FROM news_photos WHERE news_id = $1',
    [newsId],
  );

  let order = Number(lastRows[0].last_order) + 1;

  for (const file of files) {
    const filePath = `/uploads/news/${file.filename}`;
    await query('INSERT INTO news_photos (news_id, path, sort_order) VALUES ($1, $2, $3)', [
      newsId,
      filePath,
      order,
    ]);
    order += 1;
  }
};

const removeFile = (filePath) => {
  const absolutePath = path.join(__dirname, '..', filePath.replace(/^\//, ''));

  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
};

class NewsController {
  async tags(_req, res) {
    return res.json({ tags: NEWS_TAGS });
  }

  async list(req, res) {
    try {
      const tagId = parseTagId(req.query.tag);
      const params = [];
      let tagFilter = '';

      if (tagId && tagId !== 'all') {
        tagFilter = 'WHERE n.tag = $1';
        params.push(tagId);
      }

      const { rows } = await query(
        `SELECT n.*, COALESCE(json_agg(json_build_object('id', p.id, 'path', p.path, 'sort_order', p.sort_order) ORDER BY p.sort_order, p.id) FILTER (WHERE p.id IS NOT NULL), '[]') AS photos
         FROM news n
         LEFT JOIN news_photos p ON p.news_id = n.id
         ${tagFilter}
         GROUP BY n.id
         ORDER BY n.published_at DESC NULLS LAST, n.id DESC`,
        params,
      );

      return res.json({
        news: rows.map((row) => mapNews(row, row.photos)),
      });
    } catch (e) {
      console.error('News list error:', e);
      return res.status(500).json({ message: 'Не удалось получить список новостей' });
    }
  }

  async getOne(req, res) {
    try {
      const { rows } = await query('SELECT * FROM news WHERE id = $1', [req.params.id]);
      const news = rows[0];

      if (!news) {
        return res.status(404).json({ message: 'Новость не найдена' });
      }

      const photos = await getPhotos(news.id);
      return res.json({ news: mapNews(news, photos) });
    } catch (e) {
      console.error('News get error:', e);
      return res.status(500).json({ message: 'Не удалось получить новость' });
    }
  }

  async create(req, res) {
    try {
      const title = String(req.body?.title || '').trim();
      const tag = parseTagId(req.body?.tag);
      const text = String(req.body?.text || '').trim();
      const date = req.body?.date || null;

      if (!title) {
        return res.status(400).json({ message: 'Нужен заголовок' });
      }

      if (!isAllowedNewsTag(tag)) {
        return res.status(400).json({ message: 'Недопустимый тег' });
      }

      const { rows } = await query(
        'INSERT INTO news (title, tag, body, published_at) VALUES ($1, $2, $3, $4) RETURNING *',
        [title, tag, text, date],
      );

      const news = rows[0];
      await savePhotos(news.id, req.file ? [req.file] : []);
      const photos = await getPhotos(news.id);

      return res.status(201).json({ news: mapNews(news, photos) });
    } catch (e) {
      console.error('News create error:', e);
      return res.status(500).json({ message: e.message || 'Не удалось создать новость' });
    }
  }

  async update(req, res) {
    try {
      const { rows } = await query('SELECT * FROM news WHERE id = $1', [req.params.id]);
      const current = rows[0];

      if (!current) {
        return res.status(404).json({ message: 'Новость не найдена' });
      }

      const title = req.body?.title !== undefined ? String(req.body.title).trim() : current.title;
      const tag = req.body?.tag !== undefined ? parseTagId(req.body.tag) : current.tag;
      const text = req.body?.text !== undefined ? String(req.body.text).trim() : current.body;
      const date = req.body?.date !== undefined ? req.body.date || null : current.published_at;

      if (!title) {
        return res.status(400).json({ message: 'Нужен заголовок' });
      }

      if (!isAllowedNewsTag(tag)) {
        return res.status(400).json({ message: 'Недопустимый тег' });
      }

      const updated = await query(
        'UPDATE news SET title = $1, tag = $2, body = $3, published_at = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
        [title, tag, text, date, current.id],
      );

      await savePhotos(current.id, req.file ? [req.file] : []);
      const photos = await getPhotos(current.id);

      return res.json({ news: mapNews(updated.rows[0], photos) });
    } catch (e) {
      console.error('News update error:', e);
      return res.status(500).json({ message: e.message || 'Не удалось обновить новость' });
    }
  }

  async remove(req, res) {
    try {
      const photos = await getPhotos(req.params.id);
      const { rowCount } = await query('DELETE FROM news WHERE id = $1', [req.params.id]);

      if (!rowCount) {
        return res.status(404).json({ message: 'Новость не найдена' });
      }

      photos.forEach((photo) => removeFile(photo.path));

      return res.json({ message: 'Новость удалена' });
    } catch (e) {
      console.error('News delete error:', e);
      return res.status(500).json({ message: 'Не удалось удалить новость' });
    }
  }

  async removePhoto(req, res) {
    try {
      const { rows } = await query('SELECT * FROM news_photos WHERE id = $1 AND news_id = $2', [
        req.params.photoId,
        req.params.id,
      ]);
      const photo = rows[0];

      if (!photo) {
        return res.status(404).json({ message: 'Фото не найдено' });
      }

      await query('DELETE FROM news_photos WHERE id = $1', [photo.id]);
      removeFile(photo.path);

      return res.json({ message: 'Фото удалено' });
    } catch (e) {
      console.error('News photo delete error:', e);
      return res.status(500).json({ message: 'Не удалось удалить фото' });
    }
  }
}

module.exports = new NewsController();
