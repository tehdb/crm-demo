process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express'),
	app = express(),
	config = require('./config/config')[process.env.NODE_ENV];


require('./config/mongoose')(config).then(function(db){
	return require('./config/express')(config);
}).then(function(app){
	var server = app.listen( config.port );
	console.log( ">>> app running on : http://localhost:" + config.port);
});
