const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id : String,
    firstName : {
        type : String,
        required : true
    },
    lastName : String,
    picture : String,
    email : String,
    emailVerified : {
        type : String,
        enum : ['true', 'false'],
        default : 'false'
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;