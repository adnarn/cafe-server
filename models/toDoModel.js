const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskName: String,
    date: { type: Date, default: Date.now } 

}, {timestamps: true})

const TaskModel = mongoose.model('tasks' , TaskSchema)
module.exports = TaskModel