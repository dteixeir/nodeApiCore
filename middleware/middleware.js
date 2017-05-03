// package puts all requests through the middleware in order
var auth = require('./auth.js');
var autoUpdate = require('./autoUpdate.js');
var resource = require('./resource.js');
var config = require('../config.js');
var errorLog = require('../models/errorLog.js');
var stringResource = require('../stringResource.js');

module.exports = {
  middleWare: async (req, res, next, collection) => {
    try {
      await auth.verify(req, res, next);
      req = await autoUpdate.autoUpdate(req, res, next);
      var result = await resource.resource(req, res, collection);
      return result;
    } catch (err) {
      // Catching errors here to log and send bad request back to user!
      if (config.env === 'dev') {
        res.status(400).send({ error: err });
      } else {
        var result = await errorLog.create(err);
        res.status(400).send(stringResource.error[400].resourceFailed);
      }
    }
  }
}
