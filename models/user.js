const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  // Other user fields...
});

const User = mongoose.model('User', userSchema);

module.exports = User;