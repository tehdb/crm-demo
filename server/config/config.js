var path = require('path');

module.exports = {
	development: {
		"db": "mongodb://localhost:27017/MovingImageTest",
		"port" : 7171,
		"rootDir" : path.normalize(__dirname + '/../..')
	}
};

