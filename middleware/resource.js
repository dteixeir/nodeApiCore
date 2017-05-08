var ObjectID = require('mongodb').ObjectID;
var options = { upsert: true, new: true };
var _ = require('lodash');
var stringResource = require('../stringResource.js');

module.exports = {
  resource: async (req, res, collection, actions) => {
    try {
      var result = {};

      // Currently only supports one level deep for populate. Couldn't get multi-level to work.
      var populate = req.params.populate ? req.params.populate.split(',') : '';
      if (!actions[ req.originalMethod ]) throw stringResource.error[ 400 ].httpRequestNotAllowed;

      switch (req.originalMethod) {
        case 'GET':
          if (req.params.id) {
            result = await collection.findOne({ _id: new ObjectID(req.params.id) }, req.body, options).populate(populate);
          } else {
            result = await collection.find({}, req.body, options).populate(populate);
          }
          break;

        case 'PUT':
          result = await collection.findOneAndUpdate({ _id: new ObjectID(req.params.id) }, req.body, { new: true }).populate(populate);
          break;

        case 'POST':
          result = await collection.create(req.body);
          break;

        case 'DELETE':
          // utilize extra optional param to soft delete || hard delete
          // potentially put in logic to further restrict hard delete?
          if (req.params.hardDelete) {
            result = await collection.findByIdAndRemove({ _id: new ObjectID(req.params.id) });
          } else {
            result = await collection.findOneAndUpdate({ _id: new ObjectID(req.params.id) }, req.body, { new: true }).populate(populate);
          }
          break;
      }

      if (_.isEmpty(result)) throw stringResource.error[ 400 ].resourceFailed;
      return result;

    } catch (err) {
      throw { Message: err, File: __filename, Collection: collection.collection.collectionName };
    }
  }
}
