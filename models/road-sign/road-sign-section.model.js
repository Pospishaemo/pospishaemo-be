require('./road-sign.model');

const { Schema, model } = require('mongoose');

const roadSignSectionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sectionNumber: {
    type: Number,
    required: true,
  },
  paragraphs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'road-sign',
    },
  ],
});

module.exports = model('road-sign-section', roadSignSectionSchema);
