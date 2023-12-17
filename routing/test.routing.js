const { Router } = require('express');
const TestController = require('../controllers/test.controller');

const router = Router();

router.get('/road-rules/questions', TestController.getTest);
router.post('/road-rules/submit-answers', TestController.submitAnswers);

module.exports = router;
