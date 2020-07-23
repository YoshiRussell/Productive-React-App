/**
 * Restful api routes for app users
 */
const router = require('express').Router();
const { User } = require('../models/models');
require('dotenv').config();


// @ desc: get existing user id or make new user
// @ url: http://localhost:3000/api/users/getUserId&Todos
// @ require: auth0 accessToken
router.route('/getUserId&Todos').post((req, res) => {
    const { email, userId } = req.body;

    User.findOne({ userId })
        .then(user => {

            // if user doesnt exist yet: create new user id and todos
            if(!user) {
                const todos = [];
                const newUser = new User({
                    email,
                    userId,
                    todos
                });
                newUser.save()
                    .then(user => {
                        res.json({
                            userId,
                            todos
                        })
                    })
                    .catch(err => console.log("failed to save new user: " + err));
            // if user exists: get id and todos
            } else {
                res.json({
                    userId: user.userId,
                    todos: user.todos
                })
            }
        })
        .catch(err => console.log("failed to find user: " + err));
})

module.exports = router;