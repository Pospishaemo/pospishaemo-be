const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: String,
    required: true,
    default: 0,
  },
  role: {
    type: String,
    required: true,
    default: 'USER',
  },
  learnedTrafficRules: [
    {
      type: Schema.Types.ObjectId,
      ref: 'traffic-rule-section',
      required: false,
    },
  ],
  learnedRoadSigns: [
    {
      type: Schema.Types.ObjectId,
      ref: 'road-sign-section',
      required: false,
    },
  ],
});

module.exports = model('user', userSchema);
