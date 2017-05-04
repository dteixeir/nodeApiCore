var jwt = require('jsonwebtoken');
var config = require('../config.js');
var stringResource = require('../stringResource.js');

module.exports = {
  verify: async (req, res, next) => {
    var token = req.headers[ 'token' ];

    try {
      if (!token) throw stringResource.error[ 401 ];
      var verified = await jwt.verify(token, config.secret);

      // add middleware for control points?

      req.user = {
        ...verified._doc
      };
    } catch (err) {
      throw { Message: err, File: __filename };
    }
  }
}
