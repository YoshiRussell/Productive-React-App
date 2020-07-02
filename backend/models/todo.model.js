const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    id: {type: Number, required: true},
    text: {type: String, required: true},
    completed: {type: Boolean, required: true},
    priority: {type: String, required: true},
}, {
    timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;