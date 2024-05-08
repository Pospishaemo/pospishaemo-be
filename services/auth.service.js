const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ValidationError, AuthenticationError } = require('../utils/error-generator');
const UserModel = require('../models/user.model');
const TokenModel = require('../models/token.model');
const UserDto = require('../dtos/user.dto');
const TokenDto = require('../dtos/token.dto');

class AuthService {
  async login(email, password) {
    if (!(email && password)) {
      throw ValidationError('All input is required');
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw AuthenticationError('Invalid Credentials');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw AuthenticationError('Invalid Credentials');
    }

    await TokenModel.findOneAndDelete({ userId: user._id });

    const tokens = await TokenModel.create({
      userId: user._id,
      accessToken: this._generateAccessToken({ ...new UserDto(user) }),
      refreshToken: this._generateRefreshToken({ ...new UserDto(user) }),
    });

    return { user: new UserDto(user), tokens: new TokenDto(tokens) };
  }

  async registration(username, email, password) {
    if (!(email && username && password)) {
      throw ValidationError('All input is required');
    }

    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      throw AuthenticationError('User Already Exist. Please Login');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const tokens = await TokenModel.create({
      userId: user._id,
      accessToken: this._generateAccessToken({ ...new UserDto(user) }),
      refreshToken: this._generateRefreshToken({ ...new UserDto(user) }),
    });

    return { user: new UserDto(user), tokens: new TokenDto(tokens) };
  }

  async refreshToken(refreshToken) {
    if (refreshToken == null) {
      throw AuthenticationError('Refresh token is undefined!');
    }

    const tokens = await TokenModel.find();

    const isRefreshTokenExist = tokens.some((token) => token.refreshToken === refreshToken);

    if (!isRefreshTokenExist) {
      throw AuthenticationError('Refresh token does not exist!');
    }

    const newTokens = await this._jwtVerify(refreshToken);

    await TokenModel.findOneAndDelete({ refreshToken });

    await TokenModel.create({
      userId: newTokens.userId,
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
    });

    return new TokenDto(newTokens); // access & refresh token
  }

  async logout(refreshToken) {
    if (refreshToken == null) {
      throw AuthenticationError('Refresh token is undefined!');
    }

    await TokenModel.findOneAndDelete({refreshToken});

    return {}
  }

  async _jwtVerify(refreshToken) {
    return new Promise((resolve, reject) => {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, { id }) => {
        if (err) {
          reject(ValidationError('Refresh token expired!'));
        }

        const user = await UserModel.findById(id);
        const accessToken = this._generateAccessToken({ ...new UserDto(user) });

        resolve({ userId: id, accessToken: accessToken, refreshToken });
      });
    });
  }

  _generateRefreshToken(data) {
    return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
  }

  _generateAccessToken(data) {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15d' });
  }
}

module.exports = new AuthService();
