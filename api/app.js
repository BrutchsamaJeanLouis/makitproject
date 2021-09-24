var createError = require('http-errors');
var express = require('express');
var fs = require('fs').promises;
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var cors = require("cors");
var Sequelize = require("sequelize")
var session = require("express-session");
var passport = require('passport')
const { Strategy: LocalStrategy, } = require('passport-local');
// var sequelize = new Sequelize();
var sqlite3 = require('sqlite3')
var sqlite = require('sqlite')
var bcrypt = require('bcrypt')
const User = require('./db/models/user')

var db = new sqlite3.Database('./db/makit.db');


/*--------------------------------------------------------------------
|
|               Custom Functions
|
---------------------------------------------------------------------*/
function hashPassword(password, salt) {
  var hash = bcrypt.hashSync(password, salt)
  return hash
}

passport.use(new LocalStrategy(function(username, password, done){
  db.get('SELECT salt FROM users WHERE username = ?', username, function(err, row) {
    if (!row) return done(null, false);
    var hash = hashPassword(password, row.salt);
    db.get('SELECT username, id FROM users WHERE username = ? AND password = ?', username, hash, function(err, row) {
      if (!row) return done(null, false);
      return done(null, row);
    });
  });
}))
passport.serializeUser(function(user, done) {
  return done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  db.get('SELECT id, username FROM users WHERE id = ?', id, function(err, row) {
    if (!row) return done(null, false);
    return done(null, row);
  });
});


/*--------------------------------------------------------------------
|
|               SERVER ROUTE SRC
|
---------------------------------------------------------------------*/
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// to allow Resposce from other cross origins like another localHost
// Disable ths on production for security reasons add middleWare to accept only valid connections
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'sessionSecreat',resave: true, saveUninitialized:true})); // session secret
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());


/*--------------------------------------------------------------------
|
|               SERVER ROUTE LINKER
|
---------------------------------------------------------------------*/
app.use('/', indexRouter);
app.use('/user', usersRouter);


/*--------------------------------------------------------------------
|
|                    API
|
---------------------------------------------------------------------*/
app.post('/login', passport.authenticate('local', { successRedirect: '/good-login', failureRedirect: '/bad-login' }));

app.post('/registerUser', passport.authenticate('local-signup', new LocalStrategy({passReqToCallback : true},(req, username, password, done) => {

    process.nextTick(()=>{
    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    User.findOne({ where: { 'username' :  'testsama' }}).then( (userResponce) => {
        // if there are any errors, return the error

            console.log(userResponce)

    })})
})))

app.post('/register', (req, res)=>{
  res.json({"username": req.body.username})
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
