var mongoose = require('mongoose');
var base = require('./base');

var ErrorLogSchema = {
  Message: { type: String, required: true },
  File: { type: String, required: true },
  Route: { type: String },
  Collection: { type: String }
};

ErrorLogSchema = new mongoose.Schema(ErrorLogSchema, { timestamps: true });
module.exports = mongoose.model('ErrorLog', ErrorLogSchema);