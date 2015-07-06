var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var Build = require('./models/build');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

app.get('/admin', function (req, res, next) {
    res.sendFile(__dirname + "/views/admin.html")
});

app.post('/build', function(req, res, next) {
    console.log(req.body);

    var build = new Build(req.body);
    build.save(function(err, build) {
        console.log(build);
        console.log("Saved");
    });
});

app.get('/build', function(req, res, next) {
    res.sendFile(__dirname + "/views/list.html")
});

app.get('/builds', function(req, res, next) {
    Build.find(function (err, builds) {
        console.log(builds);
        var results = {"results" : builds};
        res.send(results);
    });
});

//mongodb
mongoose.connect('mongodb://localhost/switcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("hello mongo!");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
