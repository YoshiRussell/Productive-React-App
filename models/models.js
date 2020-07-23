const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// ** ---------- todo model ---------- **
const todoSchema = new Schema({
    text: {type: String, required: true},
    completed: {type: Boolean, required: true},
    details: [{type: String}],
}, {
    timestamps: true,
});

// ** ---------- user model ---------- **
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 6
    },
    userId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    todos: [todoSchema],
}, {
    timestamps: true,
});

// ** ---------- schema -> object ---------- **
const Todo = mongoose.model('Todo', todoSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
    Todo,
    User
}