/**
 * Restful api for user's todo-list data
 */
const authMiddleware = require('../middleware/auth');
const router = require('express').Router();
const { Todo, User } = require('../models/models');

router.route('/').get(authMiddleware, (req, res) => {
    const userId = req.user.id;

    User.findOne({"_id": userId})
        .then(user => res.json(user.todos))
        .catch(err => res.status(400).json('Failed to get user\'s todos with error: ' + err));
});

// add user todo 
router.route('/add').post(authMiddleware, (req, res) => {
    const userId = req.user.id;
    const text = req.body.text;
    const completed = Boolean(req.body.completed);
    const priority = req.body.priority;

    const newTodo = new Todo({
        text,
        completed,
        priority,
    });

    User.findOneAndUpdate({"_id": userId}, {
        $push: {todos: newTodo}
    }, (error, success) => {
        if(error) {console.log(error);}
        else {console.log(success);}
    });
});

// // delete specific todo via id with route https://localhost5000/todo/{id}
router.route('/delete/:id').delete(authMiddleware, (req, res) => {
    const todoItemId = req.params.id;
    const userId = req.user.id;

    User.findOneAndUpdate({"_id": userId}, {
        $pullAll: {todos: {"_id": todoItemId}}
    }, (error, success) => {
        if(error) {console.log(error);}
        else {console.log(success)}
    });
});

// // update specific todo via id with route https://localhost5000/todo/update/{id}
// router.route('/update/:id').post((req, res) => {
//     Todo.findById(req.params.id)
//         .then(todo => {
//             todo.text = req.body.text;
//             todo.completed = Boolean(req.body.completed);
//             todo.priority = req.body.priority;

//             todo.save()
//                 .then(() => res.json('Todo updated'))
//                 .catch(err => res.status(400).json('Error: ' + err));
//         })
//         .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;