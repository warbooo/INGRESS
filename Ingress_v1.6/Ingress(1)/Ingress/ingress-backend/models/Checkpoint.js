const mongoose = require('mongoose');

const checkpointSchema = new mongoose.Schema({
  checkpointId: { type: String, required: true, unique: true },
  adminChecked: { type: Boolean, default: false },
  userChecked: { type: Boolean, default: false },
  guestChecked: { type: Boolean, default: false },
  owner: { type: String, default: null }
});

module.exports = mongoose.model('Checkpoint', checkpointSchema); 