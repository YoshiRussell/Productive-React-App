/**
 * Restful api for user's todo-list data
 */
const router = require('express').Router();
const { Todo, User } = require('../models/models');

// @ desc: add user todo 
// @ url: http://localhost:3000/api/todo/add
// @ require: auth0 accessToken
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
        else {
            console.log("success: " + success);
            res.json(newTodo);
        }
    });
    
});

// @ desc: delete user todo via id
// @ url: http://localhost:3000/api/todo/delete/{id}
// @ require: auth0 accessToken
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