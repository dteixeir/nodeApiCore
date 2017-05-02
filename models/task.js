var mongoose = require('mongoose');
var base = require('./base');

var TaskSchema = {
  TaskListId: {},
  Title: { type: String, required: true },
  Files: [ String ],
  ...base
}

TaskSchema = new mongoose.Schema(TaskSchema, { timestamps: true });
module.exports = mongoose.model('Task', TaskSchema);