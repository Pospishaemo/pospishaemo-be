const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const verifyToken = require('../utils/verify-token');

const router = Router();

router.post('/login', AuthController.login);
router.post('/registration', AuthController.registration);
router.post('/refresh-token', AuthController.refreshTokens);
router.post('/logout', AuthController.logout);
router.get('/user-data', verifyToken, AuthController.userData);

module.exports = router;
