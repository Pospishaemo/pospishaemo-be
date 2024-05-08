const AuthService = require('../services/auth.service');
const generateResponse = require('../utils/response-generator');
const TokenModel = require('../models/token.model');
const UserModel = require('../models/user.model');
const UserDto = require('../dtos/user.dto');

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

  async userData(req,res,next) {
    try {
      const accessToken = req.headers['authorization']?.trim().split(' ')[1];

      const tokens = await TokenModel.findOne({ accessToken });

      const user = await UserModel.findById(tokens.userId);
      console.log(user);

      res.status(200).send(generateResponse(new UserDto(user)));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
