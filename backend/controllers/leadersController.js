const fs = require('fs');
const path = require('path');
const { query } = require('../db');

const parseBio = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  const text = String(value || '').trim();

  if (!text) {
    return [];
  }

  try {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch {
    // text paragraphs
  }

  return text
    .split(/\n{2,}/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseSlug = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-');

const mapLeader = (row, photos = []) => ({
  id: row.id,
  slug: row.slug,
  name: row.name,
  title: row.title,
  bioTitle: row.bio_title,
  bio: row.bio || [],
  sortOrder: row.sort_order,
  portrait: row.portrait || null,
  photos: photos.map((photo) => ({
    id: photo.id,
    url: photo.path,
    sortOrder: photo.sort_order,
  })),
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const getPhotos = async (leaderId) => {
  const { rows } = await query(
    'SELECT id, path, sort_order FROM leader_photos WHERE leader_id = $1 ORDER BY sort_order ASC, id ASC',
    [leaderId],
  );

  return rows;
};

const savePhoto = async (leaderId, file) => {
  if (!file) {
    return;
  }

  const { rows } = await query(
    'SELECT COALESCE(MAX(sort_order), -1) AS last_order FROM leader_photos WHERE leader_id = $1',
    [leaderId],
  );

  await query('INSERT INTO leader_photos (leader_id, path, sort_order) VALUES ($1, $2, $3)', [
    leaderId,
    `/uploads/leaders/${file.filename}`,
    Number(rows[0].last_order) + 1,
  ]);
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

const findLeader = async (idOrSlug) => {
  const key = String(idOrSlug);
  const { rows: bySlug } = await query('SELECT * FROM leaders WHERE slug = $1', [key]);

  if (bySlug[0]) {
    return bySlug[0];
  }

  if (/^\d+$/.test(key)) {
    const { rows: byId } = await query('SELECT * FROM leaders WHERE id = $1', [Number(key)]);
    return byId[0] || null;
  }

  return null;
};

class LeadersController {
  async list(_req, res) {
    try {
      const { rows } = await query(
        `SELECT l.*, COALESCE(json_agg(json_build_object('id', p.id, 'path', p.path, 'sort_order', p.sort_order) ORDER BY p.sort_order, p.id) FILTER (WHERE p.id IS NOT NULL), '[]') AS photos
         FROM leaders l
         LEFT JOIN leader_photos p ON p.leader_id = l.id
         GROUP BY l.id
         ORDER BY l.sort_order ASC, l.id ASC`,
      );

      return res.json({
        leaders: rows.map((row) => mapLeader(row, row.photos)),
      });
    } catch (e) {
      console.error('Leaders list error:', e);
      return res.status(500).json({ message: 'Не удалось получить список руководителей' });
    }
  }

  async getOne(req, res) {
    try {
      const leader = await findLeader(req.params.id);

      if (!leader) {
        return res.status(404).json({ message: 'Руководитель не найден' });
      }

      const photos = await getPhotos(leader.id);
      return res.json({ leader: mapLeader(leader, photos) });
    } catch (e) {
      console.error('Leaders get error:', e);
      return res.status(500).json({ message: 'Не удалось получить руководителя' });
    }
  }

  async create(req, res) {
    try {
      const name = String(req.body?.name || '').trim();
      const title = String(req.body?.title || '').trim();
      const slug = parseSlug(req.body?.slug);
      const bioTitle = String(req.body?.bioTitle || '').trim();
      const bio = parseBio(req.body?.bio);
      const portraitFile = req.files?.portrait?.[0];
      const galleryFile = req.files?.photo?.[0];

      if (!name) {
        return res.status(400).json({ message: 'Нужно имя' });
      }

      if (!title) {
        return res.status(400).json({ message: 'Нужна должность' });
      }

      if (!slug) {
        return res.status(400).json({ message: 'Нужен латинский slug, например simeon-plugar' });
      }

      if (!bioTitle) {
        return res.status(400).json({ message: 'Нужен заголовок текста' });
      }

      if (!bio.length) {
        return res.status(400).json({ message: 'Нужен текст' });
      }

      if (!portraitFile) {
        return res.status(400).json({ message: 'Нужна аватарка' });
      }

      if (!galleryFile) {
        return res.status(400).json({ message: 'Нужно хотя бы одно фото в галерее' });
      }

      const { rows: orderRows } = await query('SELECT COALESCE(MAX(sort_order), -1) AS last_order FROM leaders');
      const sortOrder = Number(orderRows[0].last_order) + 1;
      const portrait = portraitFile ? `/uploads/leaders/${portraitFile.filename}` : null;

      const { rows } = await query(
        'INSERT INTO leaders (slug, name, title, bio_title, bio, portrait, sort_order) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [slug, name, title, bioTitle, bio, portrait, sortOrder],
      );

      const leader = rows[0];
      await savePhoto(leader.id, galleryFile);
      const photos = await getPhotos(leader.id);

      return res.status(201).json({ leader: mapLeader(leader, photos) });
    } catch (e) {
      if (e.code === '23505') {
        return res.status(400).json({ message: 'Такой slug уже занят' });
      }

      console.error('Leaders create error:', e);
      return res.status(500).json({ message: e.message || 'Не удалось создать руководителя' });
    }
  }

  async update(req, res) {
    try {
      const current = await findLeader(req.params.id);

      if (!current) {
        return res.status(404).json({ message: 'Руководитель не найден' });
      }

      const name = req.body?.name !== undefined ? String(req.body.name).trim() : current.name;
      const title = req.body?.title !== undefined ? String(req.body.title).trim() : current.title;
      const slug = req.body?.slug !== undefined ? parseSlug(req.body.slug) : current.slug;
      const bioTitle = req.body?.bioTitle !== undefined ? String(req.body.bioTitle).trim() : current.bio_title;
      const bio = req.body?.bio !== undefined ? parseBio(req.body.bio) : current.bio;
      const portraitFile = req.files?.portrait?.[0];
      const galleryFile = req.files?.photo?.[0];

      if (!name) {
        return res.status(400).json({ message: 'Нужно имя' });
      }

      if (!title) {
        return res.status(400).json({ message: 'Нужна должность' });
      }

      if (!slug) {
        return res.status(400).json({ message: 'Нужен латинский slug' });
      }

      if (!bioTitle) {
        return res.status(400).json({ message: 'Нужен заголовок текста' });
      }

      if (!bio.length) {
        return res.status(400).json({ message: 'Нужен текст' });
      }

      if (!current.portrait && !portraitFile) {
        return res.status(400).json({ message: 'Нужна аватарка' });
      }

      let portrait = current.portrait;

      if (portraitFile) {
        removeFile(current.portrait);
        portrait = `/uploads/leaders/${portraitFile.filename}`;
      }

      const updated = await query(
        'UPDATE leaders SET slug = $1, name = $2, title = $3, bio_title = $4, bio = $5, portrait = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
        [slug, name, title, bioTitle, bio, portrait, current.id],
      );

      await savePhoto(current.id, galleryFile);
      const photos = await getPhotos(current.id);

      if (!photos.length) {
        return res.status(400).json({ message: 'Нужно хотя бы одно фото в галерее' });
      }

      return res.json({ leader: mapLeader(updated.rows[0], photos) });
    } catch (e) {
      if (e.code === '23505') {
        return res.status(400).json({ message: 'Такой slug уже занят' });
      }

      console.error('Leaders update error:', e);
      return res.status(500).json({ message: e.message || 'Не удалось обновить руководителя' });
    }
  }

  async remove(req, res) {
    try {
      const current = await findLeader(req.params.id);

      if (!current) {
        return res.status(404).json({ message: 'Руководитель не найден' });
      }

      const photos = await getPhotos(current.id);
      await query('DELETE FROM leaders WHERE id = $1', [current.id]);
      removeFile(current.portrait);
      photos.forEach((photo) => removeFile(photo.path));

      return res.json({ message: 'Руководитель удалён' });
    } catch (e) {
      console.error('Leaders delete error:', e);
      return res.status(500).json({ message: 'Не удалось удалить руководителя' });
    }
  }

  async removePhoto(req, res) {
    try {
      const current = await findLeader(req.params.id);

      if (!current) {
        return res.status(404).json({ message: 'Руководитель не найден' });
      }

      const { rows } = await query('SELECT * FROM leader_photos WHERE id = $1 AND leader_id = $2', [
        req.params.photoId,
        current.id,
      ]);
      const photo = rows[0];

      if (!photo) {
        return res.status(404).json({ message: 'Фото не найдено' });
      }

      await query('DELETE FROM leader_photos WHERE id = $1', [photo.id]);
      removeFile(photo.path);

      return res.json({ message: 'Фото удалено' });
    } catch (e) {
      console.error('Leaders photo delete error:', e);
      return res.status(500).json({ message: 'Не удалось удалить фото' });
    }
  }
}

module.exports = new LeadersController();
