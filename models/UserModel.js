const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Schema
const UserSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    servers: {
        type: Array,
        require: false
    },
    registerDate: {
        type: Date,
        require: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);