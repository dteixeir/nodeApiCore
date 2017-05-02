var jwt = require('jsonwebtoken');
var Resource = require('resourcejs');
var config = require('../config.js');
var ObjectID = require('mongodb').ObjectID;

module.exports = {
  verify: async (req, res, next) => {
    var token = req.headers[ 'token' ];

    try {
      if (!token) throw err;
      var verified = await jwt.verify(token, config.secret);

      req.user = {
        ...verified._doc
      };
    } catch (err) {
      console.log('error', err);
      res.status(401).send({ error: 'Authentication Failed.' });
    }
  }
}
