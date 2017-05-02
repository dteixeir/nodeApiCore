var ObjectID = require('mongodb').ObjectID;
var options = { upsert: true, returnNewDocument: true };
var _ = require('lodash');


module.exports = {
  resource: async (req, res, collection, options = options) => {
    try {
      var result = {};

      switch (req.originalMethod) {
        case 'GET':
          if (req.params.id) {
            result = await collection.findOne({ _id: new ObjectID(req.params.id) }, req.body, options);
          } else {
            result = await collection.find({}, req.body, options);
          }
          break;

        case 'PUT':
          result = await collection.findOneAndUpdate({ _id: new ObjectID(req.params.id) }, req.body, { returnNewDocument: true });
          break;

        case 'POST':
          result = await collection.create(req.body);
          break;
      }

      if (_.isEmpty(result)) throw 'resource failed.'
      res.send(result);

    } catch (err) {
      console.log('error', err);
      res.status(400).send({ error: err });
    }
  }
}
