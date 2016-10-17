var passport = require ('passport'),
	// LocalStrategy = require('passport-local').LocalStrategy,
	LocalStrategy = require('passport-local').Strategy;

	db = require('../models')

// Serialize Sessions
passport.serializeUser(function (user, done){
	done (null, user);
});

// Deserialize Sessions
passport.deserializeUser(function(user, done){
	db.User.find({where: {id: user.id}}).success(function(user){
		done (null, user);
	}).error (function (err){
		done(err,null)
	});
});

//  for Authentication acc to Ccode tutorial
// passport.use(new LocalStrategy({
// 	function(username, password, done){
// 		db.User.find({where: {id: user.id}}).success(function(user){
// 			passwd = user ? user.password : ""
// 			isMatch = db.user.validPassword (password, passwd, done, user)
// 		});
// 	}
// })); 

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
