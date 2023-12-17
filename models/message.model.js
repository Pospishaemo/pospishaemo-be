const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  contactInfo: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = model('message', messageSchema);
