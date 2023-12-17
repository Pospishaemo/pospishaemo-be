const { Schema, model } = require('mongoose');

const answerSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});

module.exports = model('answer', answerSchema);
