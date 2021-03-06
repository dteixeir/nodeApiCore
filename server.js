var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Promisify Mongoose
var promisify = require('promisify-node');
var impMongoose = require('mongoose');
impMongoose.Promise = global.Promise;
var mongoose = promisify(impMongoose);

var methodOverride = require('method-override');
var _ = require('lodash');

// Add Middleware necessary for REST API's
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// CORS Support
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost/taskList');

mongoose.connection.once('open', () => {
  // Load the routes.
  var routes = require('./routes');
  _.each(routes, (routeConfig, route) => {
    app.use(route, routeConfig.controller(app, route, routeConfig.model, routeConfig.actions));
  });

  console.log('Listening on port 3000...');
  app.listen(3000);
});