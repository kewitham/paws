var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // for working with cookies
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override'); // for deletes in express
var passport = require('passport');
var bcrypt = require('bcryptjs');
var models = require('./models');
var router  = express.Router();

// Our model controllers (rather than routes)
var application_controller = require('./controllers/application_controller');

var users_controller = require('./controllers/users_controller');




// Express settings
// ================

// instantiate our app
var app = express();

// override POST to have DELETE and PUT
app.use(methodOverride('_method'))

SALT_WORK_FACTOR = 12;

//allow sessions
app.use(session({ secret: 'app', cookie: { maxAge: 60000 } }));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//set up handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'frogs' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', application_controller);


router.get('/', function(req,res) {
	res.render('login');
});

// router.get('/login', function(req,res) {
// 	res.render('login');
// });

router.get('/appointment', function(req,res) {
	models.user.findOne({
		where: {
			id: req.session.id
		},
		include: [models.appointment]
	}).then(function(user) {
		//user.appointments -> [appointment, appointment...]
		res.render('appointment', {user: user, appointments: user.appointments});
	});
});

router.get('/form', function(req,res) {
	models.user.findOne({
		where:{
			id: req.session.id
		},
	}).then(function(user){

	res.render('form', {user: user});
});

router.get('/logout', function(req,res) {
  req.session.destroy(function(err) {
     res.redirect('/logout')
  })
});


// login
router.post('/login', function(req, res) {
  models.user.findOne({
    where: {email: req.body.email}
  }).then(function(user) {

		if (user == null){
			res.redirect('/user/login')
		}

		// Solution:
		// =========
		// Use bcrypt to compare the user's password input
		// with the hash stored in the user's row. 
		// If the result is true, 
    bcrypt.compare(req.body.password, user.password_hash, function(err, result) {
        // if the result is true (and thus pass and hash match)
        if (result == true){

        	// save the user's information 
					// to req.session, as the comments below show 

					// so what's happening here?
					// we enter the user's session by setting properties to req.

					// we save the logged in status to the session
          req.session.logged_in = true;
          // the username to the session
					req.session.username = user.username;
					// the user id to the session
          req.session.id = user.id;
          // and the user's email.
          req.session.email = user.email;

          res.render('user/appointment', {
		      id: req.session.id,
		      email: req.session.email,
		      logged_in: req.session.logged_in,
		      username: req.session.username,

				});
      }
      // if the result is anything but true (password invalid)
      else{
      	// redirect user to sign in
				res.redirect('/user/login')
			}
    })
  })
});

app.post('/user/create', function(req, res) {
    models.user.findAll({
        where: { email: req.body.email }
    }).then(function(user) {

        if (user.length > 0) {
            console.log(user)
            return res.send('we already have an email or username for this account')
        } else {

            // Solution:
            // =========

            // Using bcrypt, generate a 10-round salt,
            // then use that salt to hash the user's password.
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {

                    // Using the User model, create a new user,
                    // storing the email they sent and the hash you just made
                    models.user.create({
                            email: req.body.email,
                            password_hash: hash,
                            username: req.body.username
                        })
                        // In a .then promise connected to that create method,
                        // save the user's information to req.session
                        // as shown in these comments
                        .then(function(user) {


                            // so what's happening here?
                            // we enter the user's session by setting properties to req.

                            // we save the logged in status to the session
                            req.session.logged_in = true;
                            // the username to the session
                            req.session.username = user.username;
                            // the user id to the session
                            req.session.id = user.id;
                            // and the user's email.
                            req.session.email = user.email;

                            // redirect to home on login
                            return res.redirect({
                                //     id: req.session.id,
                                //     email: req.session.email,
                                //     logged_in: req.session.logged_in,
                                //     username: req.session.username
                            }, 'user/form');
                        })
                })
            })
        }
    })
});
// register a user
// router.post('/create', function(req,res) {
// 	models.user.findAll({
//     where: {email: req.body.email}
//   }).then(function(users) {

// 		if (users.length > 0){
// 			console.log(users)
// 			res.send('we already have an email or username for this account')
// 		} else {

// 			// Solution:
// 			// =========

// 			// Using bcrypt, generate a 10-round salt,
// 			// then use that salt to hash the user's password.
// 			bcrypt.genSalt(10, function(err, salt) {
// 				bcrypt.hash(req.body.password, salt, function(err, hash) {
					
// 					// Using the User model, create a new user,
// 					// storing the email they sent and the hash you just made
// 					models.User.create({
// 						email: req.body.email,
// 						password_hash: hash,
// 						username: req.body.username
// 					})
// 					// In a .then promise connected to that create method,
// 					// save the user's information to req.session
// 					// as shown in these comments
// 					.then(function(user){


// 						// so what's happening here?
// 						// we enter the user's session by setting properties to req.

// 						// we save the logged in status to the session
// 	          req.session.logged_in = true;
// 	          // the username to the session
// 						req.session.username = user.username;
// 						// the user id to the session
// 	          req.session.id = user.id;
// 	          // and the user's email.
// 	          req.session.email = user.email;

// 	          // redirect to home on login
// 						res.redirect('users/form', {
// 				  //     id: req.session.id,
// 				  //     email: req.session.email,
// 				  //     logged_in: req.session.logged_in,
// 				  //     username: req.session.username
//     		 		});
// 					})
// 				})
// 			})
// 		}
// 	})
// });

router.post('/appntcreate', function(req, res) {
  	req.body.appointment_time = appointment.appointment_time;
  	req.body.service = appointment.service;
  	req.body.dog_name = appointment.dog_name;
  }).then(function(user) {

  	res.redirect('user/appointment')

  });


// router.put('/update/:id', function(req,res) {
//   // SOLUTION:
//   // =========
//   // use the Cat model to update a cat's sleepy status
//   // based on the boolean passed in req.body sleepy
//   // and the id of the cat (as passed in the url)
//   models.user.update(
//   {
//     //sleepy: req.body.sleepy
//   },
//   {
//     where: { id : req.params.id }
//   })
//   // connect it to this .then.
//   .then(function (result) {
//     res.redirect('/');
//   }, function(rejectedPromiseError){

//   });
 });

app.use('/user', users_controller);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// no stacktraces leaked to user unless in development environment
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: (app.get('env') === 'development') ? err : {}
//   });
// });


// our module get's exported as app.
module.exports = app;
//module.exports = router;
