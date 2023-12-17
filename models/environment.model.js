const { Schema, model } = require('mongoose');

const environmentSchema = new Schema({
  key: Schema.Types.Mixed,
  value: Schema.Types.Mixed,
});

module.exports = model('environment', environmentSchema);
