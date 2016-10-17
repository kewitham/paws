var express = require ('express')
	// , ks routes = require('./routes')
	, path = require('path')
	, bodyParser = require ('body-parser')
	, cookieParser = require ('cookie-parser')
	, user = require ('./controllers/user_controller')
	, db = require ('./models')
	, http = require ('http')
	, passport = require ('passport')
	, passportConfig = require ('./config/passport')
	, methodOverride= require('method-override');
	// , bcrypt = require('bcrypt'); see user.js

var application = require('./controllers/application_controller')
	, home = require('./controllers/home_controller')
	, index = require('./controllers/index_controller')
	, user = require('./controllers/user_controller')

	// Above 4 variables = model controllers (rather than routes)

// instantiate app:
var app = express()
 
// override POST to have DELETE and PUT
app.use(methodOverride('_method'))

// below for encryption
SALT_WORK_FACTOR =12;

//allow sessions acc to cats, not sure needed
// app.use(session({ secret: 'app', cookie: { maxAge: 60000 }}));
// app.use(cookieParser());


//engine set up
app.set('views', path.join(__dirname, 'views'));


//set up handlebars
// var exphbs = require('express-handlebars');
// app.engine('handlebars', exphbs({
//     defaultLayout: 'main'
// }));
// app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));


app.set('port', process.env.PORT || 3003);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.session ({secret: 'frogsReveryWhereForSecurity'}));
app.use(passport.initialize());
app.use(passport.session({secret: 'frogsReveryWhereForSecurity'}));

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
// app.post('/authenticate', passport.authenticate('local'), function(req, res){
//  //  	successRedirect: '/home',
// 	// failureRedirect: '/'
// 	console.log("passport user", req.user);
// });

app.post('/auth', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/auth' }));
// app.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// ); as per documentation

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

// ---------Hey Katie----------
// In cats solution they have the following: 
// // our module get's exported as app.
// module.exports = app;


// // Where's the listen? Open up bin/www, and read the comments.

// ---------Hey Katie / Michael----------
// In the migration solution you pull the models in ....
// // ---------Hey Katie----------
// // and we bring in our models folder. This brings in the model's object, as defined in index.js
// var models  = require('./models');

// // extract our sequelize connection from the models object, to avoid confusion
// var sequelizeConnection = models.sequelize;  and the port listener: 
// // app listens on port 3000
// app.listen(3000, function(){
// 	console.log("Listening on port 3000")
// })

