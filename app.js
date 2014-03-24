// set up ========================
var express  = require('express');
var app      = express(); 								// create our app w/ express
var config = require('config.js')					// configurationf ile

// configuration =================

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 						// log every request to the console
	app.use(express.bodyParser()); 							// pull information from html in POST
	app.use(express.methodOverride()); 						// simulate DELETE and PUT
});

app.get('*', function(req, res) {
	res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(config.port,config.ip);
console.log("App listening at http://"+config.ip+":"+config.port);
