var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BaseSchema = {
  CreatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  UpdatedBy: { type: Schema.Types.ObjectId, ref: 'User' }
};

module.exports = BaseSchema;