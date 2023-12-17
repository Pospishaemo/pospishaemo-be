const { Schema, model } = require('mongoose');

const roadSignParagraphSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  fullParagraphNumber: {
    type: String,
    required: true,
  },
  paragraphNumber: {
    type: String,
    required: true,
  },
});

module.exports = model('road-sign', roadSignParagraphSchema);
