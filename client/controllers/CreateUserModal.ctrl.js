angular.module('MovingImage24').controller('CreateUserModalCtrl', [
	'$scope', '$modalInstance', 'ApiSrvc', 'user',

	function($scope, $modalInstance, ApiSrvc, user) {

		$scope.vm = {
			form: {},
			user: user || {}
		};

		$scope.save = function() {

			if( $scope.vm.form.$valid) {
				ApiSrvc.insert( ApiSrvc.bases.users, $scope.vm.user ).then(function(user){
					$modalInstance.close( user );
				}, function(err){
					console.log( err );
				});
			}
		};

		$scope.cancel = function(){
			$modalInstance.dismiss();
		};
	}
]);
