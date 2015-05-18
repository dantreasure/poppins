sms.controller('homeCtrl', ['$scope', 'poppins', function($scope, poppins) {
	$scope.dailyChallenge = poppins.getChallenge();
	$scope.challengeSubmission = {};

	$scope.submitAnswer = function(){
		poppins.saveAnswer($scope.challengeSubmission);
		$scope.challengeSubmission = {};
	}

}]);
