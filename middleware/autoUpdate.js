var ObjectID = require('mongodb').ObjectID;
var bcrypt = require('bcryptjs');
var config = require('../config.js');

module.exports = {
  autoUpdate: (req, res, next, collection) => {
    try {
      var hashPassword = (req) => {
        if (req.body.Password) {
          req.body.Password = bcrypt.hashSync(req.body.Password, config.encrption.salt);
        }

        return req;
      };

      switch (req.originalMethod) {
        case 'POST':
          req.body = {
            ...req.body,
            CreatedBy: new ObjectID(req.user._id),
            UpdatedBy: new ObjectID(req.user._id)
          };
          req = collection.collection.collectionName === 'users' ? hashPassword(req) : req;
          break;

        case 'PUT':
          req.body = {
            ...req.body,
            UpdatedBy: new ObjectID(req.user._id)
          };

          req = collection.collection.collectionName === 'users' ? hashPassword(req) : req;
          break;

        case 'DELETE':
          req.body = {
            ...req.body,
            UpdatedBy: new ObjectID(req.user._id),
            IsDeleted: true,
            IsActive: false
          };
          break;
      }

      return req;

    } catch (err) {
      throw { Message: err, File: __filename };
    }
  }
}
