var Schema = require('mongoose').Schema;
// Base properties to apply to Mongoose schemas

var BaseProperties = {
  CreatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  UpdatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  IsActive: { type: Boolean, default: true, required: true },
  IsDeleted: { type: Boolean, default: false, required: false },
};

module.exports = BaseProperties;