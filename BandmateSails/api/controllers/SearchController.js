/**
 * SearchController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 module.exports = {


  /**
   * Action blueprints:
   *    `/search/advance`
   */
   advance: function (req, res) {
    var city = req.param('city');
    var state = req.param('state');

    var searchQuery = req.query;
    searchQuery = _.omit(searchQuery, ['city', 'state', 'lat', 'lng', 'maxDistance']);
    if(searchQuery.age)
        searchQuery.age = parseInt(searchQuery.age);
    if(searchQuery.yearsOfExp)
        searchQuery.yearsOfExp = +searchQuery.yearsOfExp;
    console.log(searchQuery);
    if (city && state){
      var self = this;
      LocationService.getGeo(city, state, function(err, lat, lng){
         var maxD = parseFloat(req.param('maxDistance')) || 30

        Users.native(function(err, collection) {
          collection.geoNear(lng, lat, {
            maxDistance: maxD / 3959,
            // distanceMultiplier: 3959,
            spherical: true,
            query: searchQuery
          }, function(mongoErr, docs){
            if (mongoErr) {
              console.error(mongoErr);
              res.send('error!' + mongoErr)
            } else {
            //   var results = [];
            //   for(var i = 0; i < docs.results.length; i++) {
            //    if(docs.results[i].dis < maxD){
            //     docs.results[i].obj.id = docs.results[i].obj._id;
            //     results.push(docs.results[i].obj);
            //   }
            // }
            // return res.json(results);
              return res.json(_.pluck(docs.results, 'obj'));
              // return res.json(docs);
            }
          })
        });
      });
    } else {
      console.log('test3');
    // Users.Find()
    Users.find(searchQuery, function(err, users) {
      if(err){
        console.error(err);
        return res.send('error!' + err)
      } else{
        return res.json(users);
      }
    });
  }


    // Users.findOne('53630c5932c0536477c042a0', function(err, user) {

    //       if(user === undefined) return res.notFound();

    //       if (err) return next(err);

    //       res.json(user);

    //   });
    // Send a JSON response
    // return res.json({
    //   hello: 'world'
    // });
},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SearchController)
   */
   _config: {}


 };
