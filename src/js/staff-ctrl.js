sms.controller('staffCtrl', ['$scope', '$http', '$filter', 'students', function($scope, $http, $filter, students) {
	$scope.students = students.getStudents();

	$scope.ordering = '';

	$scope.mentor = '';

	$scope.setOrder = function(order){
		//It's a fool's errand trying to follow this. Just understand it allows for
		//the ordering to flow through 3 states of on, on-reverse, off
		if($scope.ordering === order){
			if($scope.ordering.charAt(0) !== '-'){
				$scope.ordering = '-' + $scope.ordering;
			}
		} else{
			if($scope.ordering === '-' + order){
				$scope.ordering = '';
			} else{
				$scope.ordering = order;
			}

		}
	};

	$scope.setMentor = function(mentor){
		$scope.mentor = mentor
	};
	//TODO: Refactor this to allow switching between mentor filters
	$scope.$watch('mentor', function(newValue, oldValue) {
		if(newValue !== ''){
			$scope.students = $filter('filter')($scope.students, {mentor:$scope.mentor});
		} else{
			$scope.students = students.getStudents();
		}
	});
}]);
