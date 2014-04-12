/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
var passport = require('passport');
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
// var is_auth = req.isAuthenticated()
//   sails.log(req);
//   if (is_auth) return next();

   passport.authenticate('basic', function(err, user, info) {
      if ((err) || (!user)) {
        return res.forbidden('You are not permitted to perform this action.');
      }
      req.logIn(user, function(err) {
        if (err) res.forbidden('You are not permitted to perform this action.');
        return next();
      });
    })(req, res);

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  // return res.forbidden('You are not permitted to perform this action.');
};

