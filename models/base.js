var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BaseSchema = {
  CreatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  UpdatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  IsActive: { type: Boolean, default: true, required: true },
  IsDeleted: { type: Boolean, default: true, required: false },
};

module.exports = BaseSchema;