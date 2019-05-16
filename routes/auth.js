const express = require('express');
const router = express.Router();
const passport = require('passport');
const fs = require('fs');
const secured = require('../middleware/secured');

const util = require('util');
const url = require('url');
const querystring = require('querystring');


const AUTH0_CLIENT_ID = process.env.PORT ? process.env.AUTH0_CLIENT_ID : fs.readFileSync(`${__dirname}/../private/auth0_client_id.txt`).toString();
const AUTH0_DOMAIN = process.env.PORT ? process.env.AUTH0_DOMAIN : fs.readFileSync(`${__dirname}/../private/auth0_domain.txt`).toString();
const AUTH0_CLIENT_SECRET = process.env.PORT ? process.env.AUTH0_CLIENT_SECRET : fs.readFileSync(`${__dirname}/../private/auth0_client_secret.txt`).toString();


// Perform the login, after login Auth0 will redirect to callback
router.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}), (req, res) => {
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get('/callback', (req, res, next) => {
  console.log('Callback!');
  passport.authenticate('auth0', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      const returnTo = req.session.returnTo;
      delete req.session.returnTo;
      res.redirect(returnTo || '/');
    });
  })(req, res, next);
});


router.get('/user', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  console.log('/user!', JSON.stringify(userProfile, null, 2));
  res.sendStatus(200);
  // res.render('user', {
  //   userProfile: JSON.stringify(userProfile, null, 2),
  //   title: 'Profile page'
  // });
});


module.exports = router;