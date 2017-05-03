var ObjectID = require('mongodb').ObjectID;
var options = { upsert: true, new: true };
var _ = require('lodash');

module.exports = {
  resource: async (req, res, collection, options = options, populate = '') => {
    try {
      var result = {};

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
      }

      if (_.isEmpty(result)) throw 'resource failed.'
      res.send(result);
    } catch (err) {
      throw { Message: err, File: __filename, Collection: collection.collection.collectionName };
    }
  }
}
