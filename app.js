var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mvc-express-mongodb-passport');
var usersModel = require('./app/models/UsersModel');

var app = express();

//Data import to  users_collection
var dataUser = {
    username: 'xuanhoapro',
    email: 'xuanhoapro@gmail.com',
    password: '123456a@',
    firstname: 'Hoa',
    lastname: 'Nguyen',
    company: 'ACV Co., Ltd.',
    created: 'Mon Dec 28 2015 11:53:26 GMT+0700 (SE Asia Standard Time)',
    updated: 'Mon Dec 28 2015 11:53:26 GMT+0700 (SE Asia Standard Time)',
    del_flg: 0
};

// Use passport login
passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (username, password, done) {
        usersModel.findOne({email: username, del_flg: 0}, function(err, user){
            if (err) { return done(err); }

            if (!user) {
                return done(null, false, {message: 'Incorrect email.'});

            }else if(user && password != user.password){
                return done(null, false, {message: 'Incorrect password.'});

            }else{
                return done(null, user);
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.email);
});

passport.deserializeUser(function(username, done) {
    usersModel.findOne({email: username, del_flg: 0}, function(err, user){
        if(!err) {
            return done(null, user);
        }
    });
});


// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app use passport and session login
app.use(session({resave: true, saveUninitialized: true, secret: 'e1%owm$p9b&qd13#jmy!l7su!j!8p7zhn8k#&n1c*qt=t!tay', cookie: { maxAge: 3600000 }})); // save login 60 mins
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

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
