angular.module('MovingImage24').controller('DeleteUserConfirmModalCtrl', [
	'$scope', '$modalInstance', 'user',

	function($scope, $modalInstance, user) {

		$scope.vm = {
			user: user
		};

		$scope.confirm = function() {
			$modalInstance.close();
		};

		$scope.cancel = function() {
			$modalInstance.dismiss();
		};

	}
]);
