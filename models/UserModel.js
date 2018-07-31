const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Schema
const UserSchema = new Schema({
    steamid: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    primaryclanid: {
        type: String,
        require: false
    },
    arma: {
        type: Boolean,
        require: false,
        default: false
    },
    servers: {
        type: Array,
        required: false,
        default: []
    },
    registerDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('users', UserSchema);