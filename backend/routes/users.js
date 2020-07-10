/**
 * Restful api routes for app users
 */
const router = require('express').Router();
const { User } = require('../models/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// findUser
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
            // if user exists: get id and todos
            } else {
                res.json({
                    userId: user.userId,
                    todos: user.todos
                })
            }
        })
})








// router.route('/getUser').post((req, res) => {
//     const { email, password } = req.body;

//     if(!email || !password) {
//         return res.status(400).json({ msg: 'Please enter all fields' });
//     }

//     // Check for existing user
//     User.findOne({ email })
//         .then(user => {
//             if(!user) return res.status(400).json({ msg: 'User does not exist' });

//             // if user exists, validate password
//             bcrypt.compare(password, user.password)
//                 .then(isMatch => {
//                     if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
                    
//                     // if user enters valid credentials, send accessToken
//                     jwt.sign(
//                         { id: user._id },
//                         process.env.JWT_SECRET,
//                         { expiresIn: 3600 },
//                         (err, accessToken) => {
//                             if(err) throw err;
//                             res.json({
//                                 accessToken,
//                                 user: {
//                                     name: user.name,
//                                     email: user.email
//                                 }
//                             });
//                         }
//                     )
//                 })
//                 .catch(err => res.status(400).json({ msg: 'error comparing password with: ' + err}));
//         })
// })

// // sign up new user + sign in new user + give accessToken
// router.route('/addUser').post((req, res) => {
//     const { name, email, password } = req.body;
//     const todos = [];

//     // validation
//     if(!name || !email || !password) {
//         return res.status(400).json({ msg: 'Please fill all fields' });
//     }

//     // check if user already exists
//     User.findOne({ email })
//         .then(user => {
//             // user exists
//             if(user) return res.status(400).json({ msg: 'User already exists' });

//             // create new user
//             const newUser = new User({ 
//                 name, 
//                 email, 
//                 password, 
//                 todos 
//             });

//             // hash user password then save new user
//             bcrypt.genSalt(10, (err, salt) => {
//                 bcrypt.hash(newUser.password, salt, (err, hash) => {
//                     if(err) throw err;

//                     newUser.password = hash;
//                     newUser.save()
//                         .then(user => {
                            
//                             // give user accesstoken needed to access private routes
//                             jwt.sign(
//                                 { id: user._id },
//                                 process.env.JWT_SECRET,
//                                 { expiresIn: 3600 }, 
//                                 (err, accessToken) => {
//                                     if(err) throw err;

//                                     res.json({
//                                         accessToken,
//                                         user: {
//                                             name: user.name,
//                                             email: user.email
//                                         }
//                                     });
//                                 }
//                             )
//                         })
//                         .catch(err => {
//                             res.status(400).json({ msg: "failed to save user with error: " + err });
//                         })
//                 })
//             })
//         })
// });

module.exports = router;