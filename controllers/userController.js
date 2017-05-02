var Resource = require('resourcejs');
var auth = require('../middleware/').auth;

module.exports = (app, route) => {
  // Setup the controller for REST;
  Resource(app, '', route, app.models.user).rest({
    before: async (req, res, next) => {
      await auth.verify(req, res, next);
    }
  });

  // Return middleware.
  return (req, res, next) => {
    next();
  };
};