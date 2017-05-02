var mw = require('../middleware/middleware.js');

module.exports = (app, route, _collection) => {
  app.get(`/${route}/:id?`, async (req, res, next) => {
    try {
      await mw.middleWare(req, res, next, _collection);
    } catch (err) {
      if (err) throw err;
    }
  });

  app.put(`/${route}/:id`, async (req, res, next) => {
    try {
      await mw.middleWare(req, res, next, _collection);
    } catch (err) {
      if (err) throw err;
    }
  });

  app.post(`/${route}`, async (req, res, next) => {
    try {
      await mw.middleWare(req, res, next, _collection);
    } catch (err) {
      if (err) throw err;
    }
  });

  // Return middleware.
  return (req, res, next) => {
    next();
  };
};