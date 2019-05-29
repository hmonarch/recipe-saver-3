// Core modules
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LocalStrategy = require('passport-local').Strategy;
const https = require('https');
const bcrypt = require('bcrypt');

const User = require('./models/user');
const Recipe = require('./models/recipe');

// DB / Mongoose modules
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');
const MongoStore = require('connect-mongo')(session);

// Middleware
const userInViews = require('./middleware/userInViews');

// Global constants
const GOOGLE_CLIENT_SECRET = process.env.PORT ? process.env.GOOGLE_CLIENT_SECRET : fs.readFileSync(`${__dirname}/private/google_client_secret.txt`).toString();
const FACEBOOK_APP_SECRET = process.env.PORT ? process.env.GOOGLE_CLIENT_SECRET : fs.readFileSync(`${__dirname}/private/facebook_app_secret.txt`).toString();



// DB setup
if (!process.env.PORT) {
  mongoose.connect('mongodb://localhost:27017/recipe-saver-3',  { useNewUrlParser: true });
} else {
  console.log('App running in heroku');
	const mongodbUri = process.env.MONGODB_URI;
	const mongooseUri = uriUtil.formatMongoose(mongodbUri);
  mongoose.connect(mongooseUri, { 
    useNewUrlParser: true, 
    server: { 
      socketOptions: { 
        keepAlive: 1, 
        connectTimeoutMS: 30000 
      }
    }
  });
}
let mongoStoreOptions;
if (!process.env.PORT) {
  mongoStoreOptions = {
    url: 'mongodb://localhost/recipe-saver-3',
  };
} else {
	mongoStoreOptions = {
		url: process.env.MONGODB_URI,
		ttl: 365 * 24 * 60 * 60,
	};
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Mongo connection succeeded'));


// Express app / Middleware
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/client/dist`));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(session({
  secret: 'cj-the-cat',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new MongoStore(mongoStoreOptions)
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// TODO: Investigate if this is needed in production
app.use(cors({
  origin: ['https://localhost:8080', 'https://localhost:8081'],
  methods: ['GET','POST'],
  credentials: true 
}));



// Passport Facebook middleware
passport.use(new FacebookStrategy({
    clientID: '299096254361478',
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: 'https://localhost:8080/auth/facebook/callback',
    profileFields: ['id', 'emails', 'name']
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('profile', profile);
    return done(null, profile);
  }
));

// Passport Google middleware
passport.use(new GoogleStrategy({
    clientID: '906915295802-ut89lg3pkgiv6t566r06imtq45d40ltl.apps.googleusercontent.com',
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://localhost:8080/auth/google/callback',
    passReqToCallback : true,
  },
  (req, accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }, (err, user) => {
      if (!user) {
        return done(null, { notRecognized: 'Hmm, we don\'t recognize that email. Please try again.' });
      } else {
        if (!user.email && profile._json.email) {
          user.email = profile._json.email;
          user.save((err, record) => {
            return done(err, user);
          });
        } else {
          return done(err, user);
        }
      }
    });
  }
));
app.get('/auth/google', (req, res, next) => {
  passport.authenticate('google', 
  { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email' ],
  })(req, res, next);
});


// Passport Local middleware
passport.use(new LocalStrategy(
  { usernameField : 'email', passwordField : 'password', passReqToCallback : true },
  (req, email, password, done) => {

    User.findOne({ email }, (err, user) => {
      if (err) return done(null, { errMessage: 'Something went wrong. Please try again.' });
      if (!user) return done(null, { errMessage: 'Hmm, we don\'t recognize that email. Please try again.' });
      if (!bcrypt.compareSync(password, user.password)) return done(null, { errMessage: 'Incorrect password. Please try again.' });
      return done(null, user);
    });
  }
));

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  console.log('userOrmessage', req.user);
  res.json({
    userID: req.user._id,
    errMessage: req.user.errMessage,
    notRecognized: req.user.notRecognized
  });
});

app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.sendStatus(200);
});


app.get('/auth/facebook', passport.authenticate('facebook', 
  { scope: ['email'] }
));


app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login-f' }), (req, res) => {
  console.log('all good google!');
  if (req.user.notRecognized) {
    res.redirect('/login?login-error=not-recognized');
  } else {
    res.redirect('/recipes');
  }
});

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login-f' }), (req, res) => {
  console.log('all good fb!', res.locals.user);
  res.redirect('/');
});


app.get('/test', (req, res) => {
  console.log('/test', req.session);
  res.sendStatus(200);
});


// Initialize API router
require('./routes/api-routes')(app);

// Get base page
// The webpack output html file should not be the same as the index route otherwise the Express static directory will immediately return the same-named file in the director and this custom Express route will never run so that's why '/' will return 'app.html' and not 'index.html'
app.get('/', (req, res) => {
  console.log('I can do things on the server now');
  res.sendFile(`${__dirname}/client/dist/app.html`);
});


app.get(['/recipes', '/recipes/:category', '/recipes/tag/:tagname'], (req, res) => {
  console.log('array of routes');
  res.sendFile(`${__dirname}/client/dist/app.html`);
});



// Listen on port 8081
// Use a self-signed certificate to serve localhost on https since Facebook login requires it
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(process.env.PORT || 8081);
