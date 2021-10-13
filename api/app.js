// TODO Split controllers into different server routers

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const bcrypt = require('bcrypt')

// Init Models
const User = require('./db/models/user')
const Project = require('./db/models/project')
const Fund = require('./db/models/fund')
const Like = require('./db/models/like')
const Location = require('./db/models/location')
const Media = require('./db/models/media')

// run a seed with server for first initialization
// TODO Make this into a script for release
// Example user password: pwd
// const seedD = require('./db/seeders/starterData')
// seedD()

/* --------------------------------------------------------------------
|
|               Custom Functions
|
--------------------------------------------------------------------- */
const isLoggedIn = require('./pluginFunctions')
// function isLoggedIn (req, res, next) {
//   // if user is authenticated in the session, carry on
//   if (req.isAuthenticated()) {
//     return next()
//   }

//   // if they aren't redirect them to the home page
//   res.redirect('/')
// }

function hashPassword (password, salt) {
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

passport.use(new LocalStrategy((username, password, done) => {
  // TODO fix associaltions/relationships to eager load here
  // User.findOne({where: {'username': username}, include: [ Project, Location, Fund,] })
  User.findOne({ where: { username: username } }).then((userResponce) => {
    if (userResponce) {
      if (bcrypt.compareSync(password, userResponce.password)) {
        done(null, userResponce)
      } else {
        done(null, false)
      }
    } else {
      done(null, false)
    }
  })
}))

passport.use('local-signup', new LocalStrategy({ passReqToCallback: true }, (req, username, password, done) => {
  // TODO add failure conditions like if variable not found and missing keys
  // find a user whose email is the same as the forms email
  // we are checking to see if the user trying to login already exists
  User.findOne({ where: { username: username } }).then(async (userResponce) => {
    // if there are any errors, return the error
    if (userResponce) {
      return done(null, false, req.flash('signUpMessage', 'User already Exist'))
    } else {
      // the request req.body.username || req.body.terms etc
      const newUser = User.build({
        username: username,
        password: hashPassword(password, 10),
        email: req.body.email,
        company: req.body.company,
        salt: 10
      })

      // // save the user
      await newUser.save()
      console.log(`User ${username} Signned Up full data below:`, newUser)
      return done(null, newUser)
    }
  })
}))
passport.serializeUser(function (user, done) {
  return done(null, user.id)
})
passport.deserializeUser(function (id, done) {
  User.findOne({ where: { id: id } })
    .then((userResponce) => {
      done(null, userResponce)
    })
})

/* --------------------------------------------------------------------
|
|               SERVER ROUTE SRC
|
--------------------------------------------------------------------- */
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const projectRouter = require('./routes/projects')
// const { info } = require('console')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs');
app.set('view engine', 'jade')

// to allow Resposce from other cross origins like another localHost
// Disable ths on production for security reasons add middleWare to accept only valid connections
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({ secret: 'sessionSecreat', resave: true, saveUninitialized: true })) // session secret
app.use(flash())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())
app.use(passport.session())

/* --------------------------------------------------------------------
|
|               SERVER ROUTE LINKER
|
--------------------------------------------------------------------- */
app.use('/index', indexRouter)
app.use('/user', usersRouter)
app.use('/projects', projectRouter)

/* --------------------------------------------------------------------
|
|                    API
|
--------------------------------------------------------------------- */
app.get('/app', isLoggedIn, (req, res) => {
  console.log('req user', req.user)
  // TODO fix associations
  Project.findAll({
    where: { userID: req.user.id },
    include: [
      { model: Like }, { model: Location }, { model: Media }, { model: Fund }
    ]
  })
    .then((userResponce) => {
      res.json({ user: req.user, projects: userResponce })
    })
})

app.post('/login', passport.authenticate('local', { successRedirect: '/app', failureRedirect: '/login', failureMessage: 'username or password incorrect' }))

app.get('/login', (req, res, next) => {
  if (!req.user) {
    res.json({ message: ['Invalid credentials'] })
  }
})

// app.get('/logout', logout, (req, res) => {
//   res.json({ user: req.user })
// })

app.get('/logout', (req, res) => {
  req.logout()
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        console.log(err)
      }
      res.json({ user: req.user })
    })
  }
})

app.get('/signup', (req, res, next) => {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err) }
    if (!user) { return res.json({ message: req.flash('signUpMessage') }) }
    res.json(user)
  })(req, res, next)
})

app.post('/signup', passport.authenticate('local-signup', {
  passReqToCallback: true,
  successRedirect: '/app', // redirect to the secure profile section
  failureRedirect: '/signup',
  failWithError: false,
  failureMessage: true,
  failureFlash: true // allow flash messages
}))

// app.get('/logout', function(req, res) {
//   req.logout();
//   res.redirect('/');
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
