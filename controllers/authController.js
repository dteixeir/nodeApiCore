var jwt = require('jsonwebtoken');
var config = require('../config.js');
// still need to encrypt pass and salt?

module.exports = (app, route, _collection) => {
  var success = async (user, res) => {
    const token = await jwt.sign(user, config.secret, { expiresIn: '5h' });
    res.status(200).json({ token: token });
  };

  var failure = (res) => {
    res.status(400).send({ error: "Failed to log in." });
  }

  app.post('/auth', async (req, res, next) => {
    try {
      const user = await _collection.findOne({ Username: req.body.username });
      (user && user.Password === req.body.password) ? success(user, res) : failure(res);
    } catch (err) {
      failure(res);
    }
  });

  // Return middleware.
  return (req, res, next) => {
    next();
  };
};