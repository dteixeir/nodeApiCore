//var Resource = require('resourcejs');
var ObjectID = require('mongodb').ObjectID;
var mw = require('../middleware');

module.exports = (app, route) => {
  var mwStuff = async (req, res, next) => {
    try {
      await mw.auth.verify(req, res, next);
      return mw.autoUpdate.autoUpdate(req, res, next);
    } catch (err) {
      console.log('error', err);
    }
  }

  app.get('/role', async (req, res, next) => {
    //await mw.auth.verify(req, res, next);
    //await mw.autoUpdate.autoUpdate(req, res, next);
    // var item = await mw.resource.resource(app, route, req, app.models.role);
    res.sendStatus(200);
  });

  app.put('/role/:id', async (req, res, next) => {
    try {
      await mw.auth.verify(req, res, next);
      req = await mw.autoUpdate.autoUpdate(req, res, next);
      var result = await mw.resource.resource(app, route, req, app.models.role);
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  });

  // Return middleware.
  return (req, res, next) => {
    next();
  };
};