var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config.js');
var stringResource = require('../stringResource.js');

module.exports = (app, route, _collection) => {
  try {
    var success = async (user, res) => {
      const token = await jwt.sign(user, config.secret, { expiresIn: '5h' });
      res.status(200).json({ token: token });
    };

    var failure = (res) => {
      res.status(400).send({ error: stringResource.error[ '400' ].loginFail });
    };

    app.post('/auth', async (req, res, next) => {
      const user = await _collection.findOne({ Username: req.body.username });
      (user && user.Password === req.body.password) ? success(user, res) : failure(res);
    });

    // Return middleware.
    return (req, res, next) => {
      next();
    };
  } catch (err) {
    throw { Message: err, File: __filename };
  }
};