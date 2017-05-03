var mw = require('../middleware/middleware.js');

module.exports = (app, route, _collection, actions) => {
  try {
    app.get(`/${route}/:id?/:populate?`, async (req, res, next) => {
      await mw.middleWare(req, res, next, _collection, actions);
    });

    app.put(`/${route}/:id`, async (req, res, next) => {
      await mw.middleWare(req, res, next, _collection, actions);
    });

    app.post(`/${route}`, async (req, res, next) => {
      await mw.middleWare(req, res, next, _collection, actions);
    });

    // Return middleware.
    return (req, res, next) => {
      next();
    };
  } catch (err) {
    throw { Message: err, File: __filename, Route: route, Collection: _collection.collection.collectionName };
  }
};