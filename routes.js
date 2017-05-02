module.exports = {
  'auth': { controller: require('./controllers/authController'), model: require('./models/user') },
  'role': { controller: require('./controllers/baseController'), model: require('./models/role') },
  'user': { controller: require('./controllers/baseController'), model: require('./models/user') },

  'task': { controller: require('./controllers/baseController'), model: require('./models/task') },
  'taskList': { controller: require('./controllers/baseController'), model: require('./models/taskList') },
};