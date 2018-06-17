const express = require('express');
const route = express.Router();


//Load user model
const User = require('../../models/UserModel');

/**
 *   @route    GET api/register/
 *   @desc     Access to all users
 *   @access   Public
 */
// route.post('/', (req, res) => {
//     User.findOne({ email: req.body.email }).then(user => {
//         if (user) {
//             return res.status(400).json({ email: 'Email già usata' });
//         }
//         const newUser = new User({
//             user: req.body.user,
//             email: req.body.email,
//             password: req.body.password
//         });
//     });

// });




module.exports = route;