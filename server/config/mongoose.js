var mongoose = require('mongoose'),
	Promise = require('bluebird'),
	readDir 	= require('readdir');


module.exports = function(config) {
	return new Promise(function(resolve, reject) {
		var dbConnection;

		mongoose.connect( config.db, function(err){
			if( err ) {
				reject(err);
			} else {
				dbConnection = mongoose.connection;

				dbConnection.on('error', function(err){
					console.error( err );
				});

				dbConnection.once('open', function(){

					// register models
					var path = config.rootDir + "/server/models";
					var models = readDir.readSync( path, ['**.mdl.js'] );

					for( var i=0,l=models.length; i < l; i++) {
						require( path + "/" + models[i] );
					}

					console.log(">>> db connection to " + config.db + " established...");
					resolve( dbConnection );
				});
			}
		});
	});
};
		// # Connection ready state
		// # 0 = disconnected
		// # 1 = connected
		// # 2 = connecting
		// # 3 = disconnecting
		// state = mongoose.connection.readyState
		// if state is 1 or state is 2 then return resolve(true)

		// mongoose.connect conf.db, (err) ->
		// 	if err then return reject( err )

		// 	db = mongoose.connection

		// 	db.on 'error', (err) ->
		// 		# TODO: log with winston
		// 		console.log "--------------"
		// 		console.error(err)
		// 		console.log "--------------"

		// 	db.once 'open', ->
		// 		console.log ">>> Mongo connection `#{conf.db}` opened..."

		// 		# scan all dirs for models and register them
		// 		path = "#{conf.root}/server"
		// 		models = readDir.readSync( path, ['**.mdl.coffee'] )
		// 		require("#{path}/#{model}") for model in models

		// 		insertSuperUser mongoose.model('User'),  -> resolve( db )
