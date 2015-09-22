angular.module('MovingImage24', [
	'restangular',
	'ui.bootstrap'
])

.config(function(RestangularProvider){
	RestangularProvider.setRequestInterceptor(function(elem, operation) {
		if (operation === "remove") {
			return undefined;
		} else {
			return elem;
		}
	});
})


.controller('MainController', [ '$scope', '$modal', 'ApiSrvc', function($scope, $modal, ApiSrvc){

	$scope.vm = {
		users: []
	};

	ApiSrvc.select( ApiSrvc.bases.users ).then(function(users){
		$scope.vm.users = users;
	});

	$scope.showCreateUserModal = function() {
		$modal.open({
			animation: true,
			templateUrl: '/partials/creatUserModal.tpl.html',
			controller: 'CreateUserModalCtrl',
			resolve: {
				user: function () {
					return null;
				}
			}
		}).result.then(function (newUser) {
			$scope.vm.users.push( newUser );
		});
	};

	$scope.showUpdateUserModal = function( user ) {
		$modal.open({
			animation: true,
			templateUrl: '/partials/creatUserModal.tpl.html',
			controller: 'CreateUserModalCtrl',
			resolve: {
				user: function () {
					return user;
				}
			}
		}).result.then(function (updatedUser) {

			// $scope.vm.users.push( newUser );
		});
	};

	$scope.showDeleteUserCofirmModal = function( user ) {
		$modal.open({
			animation: true,
			templateUrl: '/partials/deleteUserConfirmModal.tpl.html',
			controller: 'DeleteUserConfirmModalCtrl',
			resolve: {
				user: function () {
					return user;
				}
			}
		}).result.then(function () {
			ApiSrvc.remove(user).then(function(){
				var index = _.indexOf( $scope.vm.users, _.find($scope.vm.users, {
					id: user.id
				}));

				$scope.vm.users.splice( index, 1);
			});
		}, function(){

		});
	};

	// $scope.removeUser = function( user ){
	// 	ApiSrvc.remove(user).then(function(){
	// 		var index = _.indexOf( $scope.vm.users, _.find($scope.vm.users, {
	// 			id: user.id
	// 		}));

	// 		$scope.vm.users.splice( index, 1);
	// 	});
	// };

}]);

