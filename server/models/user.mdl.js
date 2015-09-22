var mongoose = require('mongoose'),
	_schemaName = 'User',
	_model,

	_schema = new mongoose.Schema({
		firstname: {
			type: String,
			required: true
		},

		lastname: {
			type: String,
			required: true
		},

		email: {
			type: String,
			lowercase: true,
			unique: true,
			required: 'Email address is required',
			match: [/.+@.+\..+/i, 'Please fill a valid email address']
		},

		tel: {
			type: String,
			unique: true
		},

		company: {
			type: String
		},

		cdate: {
			type : Date,
			default : Date.now
		}
	});

module.exports = _model = mongoose.model(_schemaName, _schema);


