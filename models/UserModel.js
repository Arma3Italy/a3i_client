const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Schema
const UserSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    steamid: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: false,
        default: ""
    },
    servers: {
        type: Array,
        require: false,
        default: []
    },
    hasArma: {
        type: Boolean,
        require: false,
        default: false
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);