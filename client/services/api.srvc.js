angular.module('MovingImage24').service('ApiSrvc', function($q, $http, Restangular){
	var c = this;

	c.bases = {
		users: Restangular.all('/api/users')
	};

	c.select = function(base, id, query){
		if(id) {
			return base.get(id);
		} else {
			return base.getList(query);
		}
	};

	c.insert = function(base, fields) {
		return base.post(fields);
	};

	c.remove = function(resource) {
		var id = resource._id || resource.id;
		// var copy = Restangular.copy( resource );
		return $q(function(resolve, reject){
			$http.delete('/api/users/' + id).then(
				function(res) {
					resolve( id );
				}, function(res) {
					reject(res);
				});
		});
	};

	return c;
});
