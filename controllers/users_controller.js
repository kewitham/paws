var express =  require('express');
var bcrypt = require('bcryptjs');
var models  = require('../models');
var router  = express.Router();

router.get('/', function(req, res) {
  res.render('form');
});

//var router  = express.Router();

//this is the users_controller.js file
// router.get('/', function(req,res) {
// 	res.render('login');
// });

// // router.get('/login', function(req,res) {
// // 	res.render('login');
// // });

// router.get('/appointment', function(req,res) {
// 	models.user.findOne({
// 		where: {
// 			id: req.session.id
// 		},
// 		include: [models.appointment]
// 	}).then(function(user) {
// 		//user.appointments -> [appointment, appointment...]
// 		res.render('appointment', {user: user, appointments: user.appointments});
// 	});
// });

// router.get('/form', function(req,res) {
// 	models.user.findOne({
// 		where:{
// 			id: req.session.id
// 		},
// 	}).then(function(user){

// 	res.render('form', {user: user});
// });

// router.get('/logout', function(req,res) {
//   req.session.destroy(function(err) {
//      res.redirect('/logout')
//   })
// });


// // login
// router.post('/login', function(req, res) {
//   models.user.findOne({
//     where: {email: req.body.email}
//   }).then(function(user) {

// 		if (user == null){
// 			res.redirect('/user/login')
// 		}

// 		// Solution:
// 		// =========
// 		// Use bcrypt to compare the user's password input
// 		// with the hash stored in the user's row. 
// 		// If the result is true, 
//     bcrypt.compare(req.body.password, user.password_hash, function(err, result) {
//         // if the result is true (and thus pass and hash match)
//         if (result == true){

//         	// save the user's information 
// 					// to req.session, as the comments below show 

// 					// so what's happening here?
// 					// we enter the user's session by setting properties to req.

// 					// we save the logged in status to the session
//           req.session.logged_in = true;
//           // the username to the session
// 					req.session.username = user.username;
// 					// the user id to the session
//           req.session.id = user.id;
//           // and the user's email.
//           req.session.email = user.email;

//           res.render('user/appointment', {
// 		      id: req.session.id,
// 		      email: req.session.email,
// 		      logged_in: req.session.logged_in,
// 		      username: req.session.username,

// 				});
//       }
//       // if the result is anything but true (password invalid)
//       else{
//       	// redirect user to sign in
// 				res.redirect('/user/login')
// 			}
//     })
//   })
// });


// // register a user
// // router.post('/create', function(req,res) {
// // 	models.user.findAll({
// //     where: {email: req.body.email}
// //   }).then(function(users) {

// // 		if (users.length > 0){
// // 			console.log(users)
// // 			res.send('we already have an email or username for this account')
// // 		} else {

// // 			// Solution:
// // 			// =========

// // 			// Using bcrypt, generate a 10-round salt,
// // 			// then use that salt to hash the user's password.
// // 			bcrypt.genSalt(10, function(err, salt) {
// // 				bcrypt.hash(req.body.password, salt, function(err, hash) {
					
// // 					// Using the User model, create a new user,
// // 					// storing the email they sent and the hash you just made
// // 					models.User.create({
// // 						email: req.body.email,
// // 						password_hash: hash,
// // 						username: req.body.username
// // 					})
// // 					// In a .then promise connected to that create method,
// // 					// save the user's information to req.session
// // 					// as shown in these comments
// // 					.then(function(user){


// // 						// so what's happening here?
// // 						// we enter the user's session by setting properties to req.

// // 						// we save the logged in status to the session
// // 	          req.session.logged_in = true;
// // 	          // the username to the session
// // 						req.session.username = user.username;
// // 						// the user id to the session
// // 	          req.session.id = user.id;
// // 	          // and the user's email.
// // 	          req.session.email = user.email;

// // 	          // redirect to home on login
// // 						res.redirect('users/form', {
// // 				  //     id: req.session.id,
// // 				  //     email: req.session.email,
// // 				  //     logged_in: req.session.logged_in,
// // 				  //     username: req.session.username
// //     		 		});
// // 					})
// // 				})
// // 			})
// // 		}
// // 	})
// // });

// router.post('/appntcreate', function(req, res) {
//   	req.body.appointment_time = appointment.appointment_time;
//   	req.body.service = appointment.service;
//   	req.body.dog_name = appointment.dog_name;
//   }).then(function(user) {

//   	res.redirect('user/appointment')

//   });


// // router.put('/update/:id', function(req,res) {
// //   // SOLUTION:
// //   // =========
// //   // use the Cat model to update a cat's sleepy status
// //   // based on the boolean passed in req.body sleepy
// //   // and the id of the cat (as passed in the url)
// //   models.user.update(
// //   {
// //     //sleepy: req.body.sleepy
// //   },
// //   {
// //     where: { id : req.params.id }
// //   })
// //   // connect it to this .then.
// //   .then(function (result) {
// //     res.redirect('/');
// //   }, function(rejectedPromiseError){

// //   });
//  });

module.exports = router;