module.exports = function (req, res, next) {
  if (req.session && req.session.passport && req.session.passport.user && req.session.passport.user._id) {
    next();
  } else {
    res.sendStatus(401);
  }
};