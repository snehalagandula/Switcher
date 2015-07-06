/**
 * Created by Sneha on 7/5/2015.
 */
var mongoose = require('mongoose');

var buildSchema = mongoose.Schema({
    buildnum: String,
    os: String,
    awd: String,
    server1: String,
    server2: String
});

var Build = mongoose.model('builds', buildSchema);
module.exports = Build;
