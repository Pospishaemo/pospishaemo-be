const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');

const router = Router();

router.post('/login', AuthController.login);
router.post('/registration', AuthController.registration);
router.post('/refresh-token', AuthController.refreshTokens);

module.exports = router;
