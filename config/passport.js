var passport = require ('passport'),
	LocalStrategy = require('passport-local').LocalStrategy,
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

//  for Authentication
passport.use(new LocalStrategy{
	function(username, password, done){
		db.User.find({where: {id: user.id}}).success(function(user){
			passwd = user ? user.password : ""
			isMatch = db.user.validPassword (password, passwd, done, user)
		});
	}
});
