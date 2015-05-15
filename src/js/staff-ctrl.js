sms.controller('staffCtrl', ['$scope', 'students', function($scope, students) {
	$scope.students = students.getStudents();

}]);
