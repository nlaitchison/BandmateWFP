/**
 * Videos
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {

		/* e.g.
		nickname: 'string'
		*/

	},
	beforeUpdate: function(valuesToUpdate, cb) {

		var diff = require('deep-diff').diff;
		Videos.findOne({id: valuesToUpdate.currentId}, function(err, current) {

			// console.log('values to update  --------------------------');
			// console.log(valuesToUpdate);
			// console.log('current --------------------------');
			// console.log(current);

			var differences = diff(current.urls, valuesToUpdate.urls);

			// console.log('differences --------------------------');
			// console.log(differences);

			Newsfeed.findOne({id: valuesToUpdate.currentId}).done(function(err, updates) {


				var obj = { timeStamp: new Date(), updates: [] };

				d = _.filter(differences, function(item){
		          if(item.kind == 'A' && item.item.path == 'code') {
		          	// console.log(item);
		          	v = { type : 'video', change: item.item.rhs };
		          	obj.updates.push(v);
		  			console.log(obj);
		  			updates.changes.push(obj);
		          	return item;
		          }
		        });

		        updates.save(function(err){
		        	if(err){
		        		console.log(err);
		        	}
		        });
			});

		});
		// Users.findOne({email: valuesToUpdate.email}, function(err, user) {
		//   if(err){
		//     console.error(err);
		//   } else{
		//       var current = user;
		//       var changes = [];
		//       var differences = diff(current, valuesToUpdate);
		//       Newsfeed.findOne({id: current.id}).done(function(err, updates) {
		//         var cObj = { timeStamp: new Date(), updates: [] };
		//         var scObj = { timeStamp: new Date(), updates: [] };
		//         var pObj = { timeStamp: new Date(), updates: [] };
		//         d = _.filter(differences, function(item){
		//           if((item.kind == 'N' || item.kind == 'E' || item.kind == 'A') && item.path[0] != 'updatedAt' && item.path[0] != 'createdAt') {
		//             return item;
		//           }
		//         });
		//         // console.log(d);
		//         for(var i = 0; i < d.length; i++) {
		//           if(d[i].path[0] != 'scPlayerUrl' && d[i].path[0] != 'profileImg'){
		//             if(d[i].kind != 'A'){
		//               obj = { type : d[i].path[0], change : d[i].rhs };
		//               cObj.updates.push(obj);
		//             }else if(d[i].kind == 'A'){
		//               obj = { type : d[i].path[0], change : d[i].item.rhs };
		//               cObj.updates.push(obj);
		//             }
		//           }else if(d[i].path[0] == 'scPlayerUrl'){
		//             obj = { type : d[i].path[0], change : d[i].rhs };
		//             scObj.updates.push(obj);
		//           }else if(d[i].path[0] == 'profileImg'){
		//             obj = { type : d[i].path[0], change : d[i].rhs };
		//             scObj.updates.push(obj);
		//           }
		//           console.log(obj);
		//         }
		//         if(cObj.updates.length > 0){
		//           updates.changes.push(cObj);
		//         }
		//         if(scObj.updates.length > 0){
		//           updates.changes.push(scObj);
		//         }
		//         if(pObj.updates.length > 0){
		//           updates.changes.push(pObj);
		//         }
		//         updates.save(function(err){});
		//         // console.log(updates.changes);
		//       });

		//     }
		// });
		// // console.log('new', valuesToUpdate.about);
		cb(null, valuesToUpdate);
	}

};
