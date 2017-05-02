var mongoose = require('mongoose');
var base = require('./base');
var mw = require('../middleware/auth.js');

var RoleSchema = {
  Name: { type: String, required: true },
  ...base
};

RoleSchema = new mongoose.Schema(RoleSchema, { timestamps: true });
module.exports = mongoose.model('Role', RoleSchema);