var mongoose = require('mongoose');

var AuthSchema = {
  Password: { type: String, required: true },
  Username: { type: String, required: true }
};

AuthSchema = new mongoose.Schema(AuthSchema);
module.exports = mongoose.model('auth', AuthSchema);