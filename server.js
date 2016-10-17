var express = require ('express')
	// , ks routes = require('./routes')
	, path = require('express')
	, bodyParser = require ('body-parser')
	, cookieParser = require ('cookie-parser')
	, app = express()
	, user = require ('./controllers/user_controller')
	, db = require ('./models')
	, http = require ('http')
	, passport = require ('passport')
	, passportConfig = require ('./config/passport')
	, methodOverride= require('method-override');
	// , bcrypt = require('bcrypt'); see user.js

var application = require('./controllers/application')
	, home = require('./controllers/home_controller')
	, index = require('./controllers/index_controller')
	, user = require('./controllers/user_controller')
	

	// Above 4 variables = model controllers (rather than routes)


SALT_WORK_FACTOR =12;

app.use('/public', express.static(__dirname + '/public'));

app.set('views', __dirname + '/views')

app.set('port', process.env.PORT || 3003)

app.use(express.urlencoded ())
app.use(express.bodyParser())
app.use(express.cookieParser())
app.use(express.session ({secret: 'frogsReveryWhereForSecurity'}))
app.use(passport.initialize())
app.use(passport.session())
// ks app.use(app.router)

app.use('/', application_controller);
app.use('/home', home_controller);
app.use('/index', index_controller);
app.use('/user', user_controller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// ks if("development" === app.get ('env')){
// 	app.use (express.errorHandler())
// }

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

app.get('/', controller.index_controller)
app.get('/home', application.IsAuthenticated, home.homepage)
// lines 69-74 first attempt app.post('/authenticate',
// 	passport.authenticate('local', {
// 		successRedirect: '/home',
// 		failureRedirect: '/'
// 	})
// ) replaced by lines 75-79
app.post('/authenticate', passport.authenticate('local'), function(req, res){
 //  	successRedirect: '/home',
	// failureRedirect: '/'
	console.log("passport user", req.user);
});

app.get ('/logout', application.destroySession)
app.get ('/signup', user.signUp)
app.post('/register', user.register)

db
	.sequelize
	.sync()
	.complete (function(err){
		if (err) {
			throw err [0]
		} else {
			db.User.find({where: {username: 'admin'}}).success(function (user){
				if (!user) {
					db.User.build({username:'admin', password: 'admin'}).save();
				};
			});
	

			http.createServer(app).listen(app.get ('port'), function(){
				console.log("Express is listening on port" + app.get('port'))
			});
		};

	});

