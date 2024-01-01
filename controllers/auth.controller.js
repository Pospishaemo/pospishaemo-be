const AuthService = require('../services/auth.service');
const generateResponse = require('../utils/response-generator');

class AuthController {
  async registration(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const data = await AuthService.registration(username, email, password);

      res.status(200).send(generateResponse(data));
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const data = await AuthService.login(email, password);

      res.status(200).send(generateResponse(data));
    } catch (error) {
      next(error);
    }
  }

  async refreshTokens(req, res, next) {
    try {
      const { refreshToken } = req.body;

      const data = await AuthService.refreshToken(refreshToken);

      res.status(200).send(generateResponse(data));
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;

      const data = await AuthService.logout(refreshToken);

      res.status(200).send(generateResponse(data));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
