sms.controller('staffCtrl', ['$scope', '$http', '$filter', 'students', function($scope, $http, $filter, students) {
	$scope.students = students.getStudents();
	$scope.ordering = '';

	$scope.mentor = '';

	$scope.setOrder = function(order){
		if($scope.ordering === order){
			if($scope.ordering.charAt(0) !== '-'){
				$scope.ordering = '-' + $scope.ordering;
			} else{
				$scope.ordering = '';
			}
		} else{
			$scope.ordering = order;
		}
	};

	$scope.setMentor = function(mentor){
		$scope.mentor = mentor
	};

	$scope.$watch('mentor', function(newValue, oldValue) {
		if(newValue !== ''){
			$scope.students = $filter('filter')($scope.students, {mentor:$scope.mentor});
		} else{
			$scope.students = students.getStudents();
		}

	});
}]);
