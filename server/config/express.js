var Promise = require('bluebird'),
	express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),

	User = mongoose.model('User');

module.exports = function(config) {
	return new Promise(function(resolve, reject) {
		var app = express();

		app.set('port', config.port );
		app.set('view engine', 'jade' );
		app.set('views', "./views" );
		app.use( require('method-override')() );
		app.use( bodyParser.json() );
		app.use( bodyParser.urlencoded({ extended: true }) );

		app.use(express.static(config.rootDir + '/bower_components'));
		app.use(express.static(config.rootDir + '/client'));

		app.get('/api/users', function(req, res){
			User.find(function(err, users){
				if( err ) {
					console.log( err );
				} else {
					res.status(200).json(users)
				}

			});
		});

		app.post('/api/users', function(req, res){
			var data = req.body;

			// update
			if( data._id ) {
				var id = data._id;
				delete data._id
				User.findByIdAndUpdate( id, data, function(err, user){
					if( err ) {
						res.status(400).json( err );
					} else {
						res.status(200).json(user);
					}
				});

			// create
			} else {
				new User( data ).save(function(err, user){
					if( err ) {
						res.status(400).json( err );
					} else {
						res.status(200).json(user);
					}
				});
			}
		});

		app.delete('/api/users/:id', function(req, res) {
			var id = req.params.id;
			User.findByIdAndRemove( id, function(err, user) {
				if( err ) {
					res.status(400).json( err );
				} else {
					res.status(200).json(user);
				}
			});
		});

		resolve( app );
	});
};
