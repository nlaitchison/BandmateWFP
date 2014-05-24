/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var bcrypt = require('bcrypt');
module.exports = {

  attributes: {
      username: {
      type: 'string',
      required: true,
      unique: true
    },
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log('yo', err);
          cb(err);
        }else{
          user.password = hash;
          cb(null, user);
        }
      });
    });
  },
  beforeUpdate: function(valuesToUpdate, cb) {
    var diff = require('deep-diff').diff;

    Users.findOne({email: valuesToUpdate.email}, function(err, user) {
      if(err){
        console.error(err);

      } else{
        var current = user;
        var differences = diff(current, valuesToUpdate);
        console.log('differences', differences);
      }
    });

    // console.log('new', valuesToUpdate.about);
    // cb(null, valuesToUpdate);
  }
};

