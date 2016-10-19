var debug = require('debug')('express-example');

// we bring in the app we exported from server.js
var app = require('../server');

// we bring in the models we exported with index.js
var models = require("../models");

// we set the port of the app
app.set('port', process.env.PORT || 3000);


// we sync the models with our db 
// (thus creating the apropos tables)
models.sequelize.sync().then(function () {
	// set our app to listen to the port we set above
  var server = app.listen(app.get('port'), function() {
  	// then save a log of the listening to our debugger.
    debug('Express server listening on port ' + server.address().port);
  });
});