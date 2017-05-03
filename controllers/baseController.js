var mw = require('../middleware/middleware.js');

module.exports = (app, route, _collection) => {
  try {
    app.get(`/${route}/:id?`, async (req, res, next) => {
      await mw.middleWare(req, res, next, _collection);
    });

    app.put(`/${route}/:id`, async (req, res, next) => {
      await mw.middleWare(req, res, next, _collection);
    });

    app.post(`/${route}`, async (req, res, next) => {
      await mw.middleWare(req, res, next, _collection);
    });

    // Return middleware.
    return (req, res, next) => {
      next();
    };
  } catch (err) {
    throw { Message: err, File: __filename, Route: route, Collection: _collection.collection.collectionName };
  }
};