const { Schema, model } = require('mongoose');

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
});

module.exports = model('token', tokenSchema);
