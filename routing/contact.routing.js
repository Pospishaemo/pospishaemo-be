const { Router } = require('express');
const ContactController = require('../controllers/contact.controller');

const router = Router();

router.post('/message', ContactController.message);

module.exports = router;
