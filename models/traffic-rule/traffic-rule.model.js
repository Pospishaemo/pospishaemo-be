const { Schema, model } = require('mongoose');

const trafficRuleParagraphSchema = new Schema({
  text: {
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

module.exports = model('traffic-rule', trafficRuleParagraphSchema);

