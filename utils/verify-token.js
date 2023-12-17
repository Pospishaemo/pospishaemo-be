const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token.model');
const { AuthenticationError } = require('./error-generator');

const verifyToken = async (req, res, next) => {
  const accessToken = req.headers['authorization']?.trim().split(' ')[1];

  if (!accessToken) {
    next(AuthenticationError('A token is required for authentication!'));
  }

  const tokens = await TokenModel.findOne({ accessToken });

  if (!tokens) {
    next(AuthenticationError('Token does not exist!'));
  }

  try {
    req.user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    next(AuthenticationError('Invalid Token!'));
  }

  return next();
};

module.exports = verifyToken;
