var jwt = require('jsonwebtoken');
var config = require('../config.js');

module.exports = (app, route) => {
  var success = async (user, res) => {
    const token = await jwt.sign(user, config.secret, { expiresIn: '1h' });
    res.status(200).json({ token: token });
  };

  var failure = (res) => {
    res.status(400).send({ error: "Failed to log in." });
  }

  app.post('/auth', async (req, res, next) => {
    try {
      const user = await app.models.user.findOne({ Username: req.body.username });
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