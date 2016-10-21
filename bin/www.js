//var debug = require('debug')('express-example');

// we bring in the app we exported from server.js
var app = require('../server');

// we bring in the models we exported with index.js
var models = require("../models");

// we set the port of the app
app.set('port', process.env.PORT || 3000);


// we sync the models with our db 
// (thus creating the apropos tables)
//console.log('lkjsdf;lakjsd;flkjas;dlfkja;sldkfj;alkdfj;laksdjfl;ajdf;lakjdf;lasjdfladf');
models.sequelize.sync().then(function () {
  var server = app.listen(app.get('port'), function() {
	// set our app to listen to the port we set above
  	// then save a log of the listening to our debugger.
    console.log('Express server listening on port ' + server.address().port);
  });
});