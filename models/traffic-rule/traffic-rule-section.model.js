const { Schema, model } = require('mongoose');
require('./traffic-rule.model');

const trafficRuleSectionSchema = new Schema({
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
      ref: 'traffic-rule',
    },
  ],
});

module.exports = model('traffic-rule-section', trafficRuleSectionSchema);
