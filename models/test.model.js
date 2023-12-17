const { Schema, model } = require('mongoose');

const testSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: Schema.Types.ObjectId,
    ref: 'answer',
    required: true,
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'answer',
      required: true,
    },
  ],
});

module.exports = model('test', testSchema);
