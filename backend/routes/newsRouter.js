const { Router } = require('express');
const newsController = require('../controllers/newsController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadNewsPhotos = require('../middleware/uploadNewsPhotos');

const router = Router();
const photosUpload = uploadNewsPhotos.single('photo');

router.get('/', newsController.list);
router.get('/tags', newsController.tags);
router.get('/:id', newsController.getOne);
router.post('/', authMiddleware, photosUpload, newsController.create);
router.patch('/:id', authMiddleware, photosUpload, newsController.update);
router.delete('/:id', authMiddleware, newsController.remove);
router.delete('/:id/photos/:photoId', authMiddleware, newsController.removePhoto);

module.exports = router;
