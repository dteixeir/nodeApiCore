var ObjectID = require('mongodb').ObjectID;
var promisify = require('promisify');


module.exports = {
  resource: async (app, route, req, item) => {
    try {
      var result = {};
      switch (req.originalMethod) {
        case 'PUT':
          result = await item.findOneAndUpdate({ _id: new ObjectID(req.params.id) }, req.body, { upsert: true })//, function (err, results) {
      }
      return result;
    } catch (err) {
      console.log('error', err);
      res.status(400).send({ error: 'resource failed.' });
    }
  }
}
