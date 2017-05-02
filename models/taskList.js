var mongoose = require('mongoose');
var base = require('./base');
var Schema = mongoose.Schema;

var TaskListSchema = {
  TaskListId: {},
  Title: { type: String, required: true },
  Tasks: [
    { type: Schema.Types.ObjectId, ref: 'Task' }
  ],
  ...base
};

TaskListSchema = new mongoose.Schema(TaskListSchema, { timestamps: true });
module.exports = mongoose.model('TaskList', TaskListSchema);