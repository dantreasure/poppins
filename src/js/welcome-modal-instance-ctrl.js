sms.controller('WelcomeModalInstanceCtrl', ['$scope', '$modalInstance', '$cookies', function ($scope, $modalInstance, $cookies) {
	$scope.close = function(){
		$cookies.welcomed = true;

		$modalInstance.close();
	};
}]);
