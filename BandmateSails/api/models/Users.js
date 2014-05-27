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
          var changes = [];
          var differences = diff(current, valuesToUpdate);
          // console.log('differences', differences);
          // console.log('---------------');
          Newsfeed.findOne({id: current.id}).done(function(err, updates) {
            var cObj = { timeStamp: new Date(), updates: [] };
            var scObj = { timeStamp: new Date(), updates: [] };
            var pObj = { timeStamp: new Date(), updates: [] };
            // c = _.filter(differences, function(item){
            //   if((item.kind == 'N' || item.kind == 'E') && item.path[0] != 'updatedAt' && item.path[0] != 'scPlayerUrl') {
            //     obj = { type : item.path[0], change : item.rhs };
            //     changes.updates.push(obj);
            //     // return item;
            //   }else if(item.kind == 'A') {
            //     obj = { type : item.path[0], change : item.item.rhs };
            //     changes.updates.push(obj);
            //     // return item;
            //   }else if(item.path[0] == 'scPlayerUrl') {
            //     obj = { type : item.path[0], change : item.rhs };
            //     sc.updates.push(obj);
            //     // return item;
            //   }

            //   updates.changes.push(changes);
            //   //  updates.changes.push(sc);
            // });
            // console.log(updates);
            d = _.filter(differences, function(item){
              if((item.kind == 'N' || item.kind == 'E' || item.kind == 'A') && item.path[0] != 'updatedAt' && item.path[0] != 'createdAt') {
                return item;
              }
            });
            // console.log(d);
            for(var i = 0; i < d.length; i++) {
              if(d[i].path[0] != 'scPlayerUrl' && d[i].path[0] != 'profileImg'){
                if(d[i].kind != 'A'){
                  obj = { type : d[i].path[0], change : d[i].rhs };
                  cObj.updates.push(obj);
                }else if(d[i].kind == 'A'){
                  obj = { type : d[i].path[0], change : d[i].item.rhs };
                  cObj.updates.push(obj);
                }
              }else if(d[i].path[0] == 'scPlayerUrl'){
                obj = { type : d[i].path[0], change : d[i].rhs };
                scObj.updates.push(obj);
              }else if(d[i].path[0] == 'profileImg'){
                obj = { type : d[i].path[0], change : d[i].rhs };
                scObj.updates.push(obj);
              }
              console.log(obj);
            }
            if(cObj.updates.length > 0){
              updates.changes.push(cObj);
            }
            if(scObj.updates.length > 0){
              updates.changes.push(scObj);
            }
            if(pObj.updates.length > 0){
              updates.changes.push(pObj);
            }
            updates.save(function(err){});
            // console.log(updates.changes);
          });

        }
    });
    // console.log('new', valuesToUpdate.about);
    cb(null, valuesToUpdate);
  }
};
