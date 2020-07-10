/**
 * Restful api for user's todo-list data
 */
const router = require('express').Router();
const { Todo, User } = require('../models/models');

// add user todo 
router.route('/add').post((req, res) => {
    const { userId, text, completed, priority } = req.body;
  
    const newTodo = new Todo({
        text,
        completed,
        priority,
    });

    User.findOneAndUpdate({ userId }, {
        $push: {todos: newTodo}
    }, (error, success) => {
        if(error) {console.log(error);}
        else {console.log(success);}
    });
});

// // delete specific todo via id with route https://localhost5000/todo/{id}
router.route('/delete/:id').post((req, res) => {
    const todoItemId = req.params.id;
    const { userId } = req.body;

    User.findOneAndUpdate({ userId }, {
        $pull: {todos: {"_id": todoItemId}}
    }, (error, success) => {
        if(error) {console.log(error);}
        else {console.log(success)}
    });
});

module.exports = router;