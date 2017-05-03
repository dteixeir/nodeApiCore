module.exports = {
  'auth': { controller: require('./controllers/authController'), model: require('./models/user'), actions: { GET: false, PUT: false, POST: true, DELETE: false } },
  'role': { controller: require('./controllers/baseController'), model: require('./models/role'), actions: { GET: true, PUT: true, POST: true, DELETE: false } },
  'user': { controller: require('./controllers/baseController'), model: require('./models/user'), actions: { GET: true, PUT: true, POST: true, DELETE: false } },

  'task': { controller: require('./controllers/baseController'), model: require('./models/task'), actions: { GET: true, PUT: true, POST: true, DELETE: false } },
  'taskList': { controller: require('./controllers/baseController'), model: require('./models/taskList'), actions: { GET: true, PUT: true, POST: true, DELETE: false } }
};