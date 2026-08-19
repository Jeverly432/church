const { Router } = require('express');
const leadersController = require('../controllers/leadersController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadLeaders = require('../middleware/uploadLeaders');

const router = Router();
const filesUpload = uploadLeaders.fields([
  { name: 'portrait', maxCount: 1 },
  { name: 'photo', maxCount: 1 },
]);

router.get('/', leadersController.list);
router.get('/:id', leadersController.getOne);
router.post('/', authMiddleware, filesUpload, leadersController.create);
router.patch('/:id', authMiddleware, filesUpload, leadersController.update);
router.delete('/:id', authMiddleware, leadersController.remove);
router.delete('/:id/photos/:photoId', authMiddleware, leadersController.removePhoto);

module.exports = router;
