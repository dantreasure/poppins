sms.controller('homeCtrl', ['$scope', 'poppins', function($scope, poppins) {
	$scope.challenge = poppins.getChallenge();
	$scope.interviewQuestion = poppins.getInterviewQuestion();
	$scope.challengeSubmission = {};

	$scope.submitAnswer = function(){
		poppins.saveAnswer($scope.challengeSubmission);
		$scope.challengeSubmission = {};
	}

}]);
