const router = require('express').Router();
let Todo = require('../models/todo.model');


// get todo with route http://localhost:5000/todos/
router.route('/').get((req, res) => {
    Todo.find()
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error: ' + err));
});

// add todo with route http://localhost:5000/todo/add
router.route('/add').post((req, res) => {
    const text = req.body.text;
    const completed = Boolean(req.body.completed);
    const priority = req.body.priority;

    const newTodo = new Todo({
        text,
        completed,
        priority,
    });

    newTodo.save()
        .then(() => res.json('Todo added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// // get specific todo via id with route http://localhost:5000/todo/{id}
// router.route('/:id').get((req, res) => {
//     Todo.findById(req.params.id)
//         .then(todo => res.json(todo))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// // delete specific todo via id with route https://localhost5000/todo/{id}
router.route('/:id').delete((req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(() => res.json('Todo deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
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