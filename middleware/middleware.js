// package puts all requests through the middleware in order
var auth = require('./auth.js');
var autoUpdate = require('./autoUpdate.js');
var resource = require('./resource.js');
var response = require('./response.js');
var config = require('../config.js');
var errorLog = require('../models/errorLog.js');
var stringResource = require('../stringResource.js');

module.exports = {
  middleWare: async (req, res, next, collection, actions) => {
    try {
      await auth.verify(req, res, next);                                    // Authenticate
      req = await autoUpdate.autoUpdate(req, res, next, collection);        // House Keeping properties maintained
      var result = await resource.resource(req, res, collection, actions);  // Act upon db request
      response.response(req, res, result, collection);                      // Return proper status codes - maybe more logic in here?
    } catch (err) {
      // If in prod send back generic 400 and log error
      // If dev then send error back
      if (config.env === 'dev') {
        res.status(400).send({ error: err });
      } else {
        var result = await errorLog.create(err);
        res.status(400).send(stringResource.error[ 400 ].resourceFailed);
      }
    }
  }
}
