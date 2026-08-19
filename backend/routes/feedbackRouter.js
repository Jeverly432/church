const { Router } = require('express');
const feedbackController = require('../controllers/feedbackController');

const router = Router();

router.post('/', feedbackController.send);

module.exports = router;
