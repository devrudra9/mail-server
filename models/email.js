const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  // Other email fields...
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;