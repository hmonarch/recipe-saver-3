// Core modules
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

// DB / Mongoose modules
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');
const MongoStore = require('connect-mongo')(session);

// Middleware
const userInViews = require('./middleware/userInViews');
const authRouter = require('./routes/auth');

// Global constants
const AUTH0_CLIENT_ID = process.env.PORT ? process.env.AUTH0_CLIENT_ID : fs.readFileSync(`${__dirname}/private/auth0_client_id.txt`).toString();
const AUTH0_DOMAIN = process.env.PORT ? process.env.AUTH0_DOMAIN : fs.readFileSync(`${__dirname}/private/auth0_domain.txt`).toString();
const AUTH0_CLIENT_SECRET = process.env.PORT ? process.env.AUTH0_CLIENT_SECRET : fs.readFileSync(`${__dirname}/private/auth0_client_secret.txt`).toString();


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
// app.use(express.static(`${__dirname}/client/dist`));
app.use(bodyParser.json());
app.use(session({
  secret: 'cj-the-cat',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new MongoStore(mongoStoreOptions)
}));
// TODO: Investigate if this is needed in production
app.use(cors());


const strategy = new Auth0Strategy(
  {
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.PORT ? process.env.AUTH0_CALLBACK_URL : 'http://localhost:8080/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
app.use('/', authRouter);
app.use('/test', userInViews());


// Initialize API router
require('./routes/api-routes')(app);


// Get base page
app.get(['/', '/recipes', '/recipes/:category', '/recipes/tag/:tagname'], (req, res) => {
  console.log('has this log ever appearred?');
  res.sendFile(`${__dirname}/client/dist/index.html`);
});


// We can't proxy / since the Vue dev server lives there so to mimic production, we'll hit the /home router in development which will do the same thing as / in production
app.get('/home', (req, res) => {
  console.log('JUST TESTING - home');
});


app.get('/test', (req, res) => {
  console.log('/test', res.locals.user);
  res.sendStatus(200);
});


// List on port 8081
app.listen(process.env.PORT || 8081);
