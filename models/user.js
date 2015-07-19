/**
 * Created by Sneha on 7/5/2015.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String

});

var User = mongoose.model('switcher_fields', userSchema);
module.exports = User;

