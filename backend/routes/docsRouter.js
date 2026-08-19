const { Router } = require('express');
const docsController = require('../controllers/docsController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadDocs = require('../middleware/uploadDocs');

const router = Router();
const fileUpload = uploadDocs.single('file');

router.get('/', docsController.list);
router.get('/:id', docsController.getOne);
router.post('/', authMiddleware, fileUpload, docsController.create);
router.patch('/:id/pin', authMiddleware, docsController.pin);
router.patch('/:id', authMiddleware, fileUpload, docsController.update);
router.delete('/:id', authMiddleware, docsController.remove);

module.exports = router;
