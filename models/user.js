var mongoose = require('mongoose');
var base = require('./base');
var Schema = mongoose.Schema;

var UserSchema = {
  FirstName: { type: String, required: true },
  MiddleName: { type: String },
  LastName: { type: String, required: true },
  Email: { type: String, required: true },
  Number: { type: String },
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Role: [
    { type: Schema.Types.ObjectId, ref: 'Role' }
  ],
  ...base
};

UserSchema = new mongoose.Schema(UserSchema, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);