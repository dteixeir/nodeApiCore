// package puts all requests through the middleware in order
var auth = require('./auth.js');
var autoUpdate = require('./autoUpdate.js');
var resource = require('./resource.js');

module.exports = {
  middleWare: async (req, res, next, collection) => {
    try {
      await auth.verify(req, res, next);
      req = await autoUpdate.autoUpdate(req, res, next);
      var result = await resource.resource(req, res, collection);
      return result;
    } catch (err) {
      console.log('error', err);
      res.status(400).send({ error: 'Something seems to have failed, sorry.' });
    }
  }
}
