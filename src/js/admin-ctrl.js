sms.controller('adminCtrl', ['$scope', 'students', function($scope, students) {


	$scope.students = students;

	$scope.addStudent = function(){
		$scope.students.$add({
      name: $scope.newStudent.name,
      avatar: $scope.newStudent.avatar,
      telephone: $scope.newStudent.phone,
      email: $scope.newStudent.email,
      notes: $scope.newStudent.notes
    });

    $scope.newStudent= {};
	};

	$scope.students.$loaded(function() {
    if ($scope.students.length === 0) {
      $scope.students.$add({
        name: 'daniel treasure',
	      avatar: 'http://blahblahblah',
	      telephone: '801-628-0193',
	      email: 'dbtreasure@gmail.com',
	      notes: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod tempore molestiae dolore fugit. Totam necessitatibus quae explicabo qui vel, iusto nesciunt fuga et, facere, autem optio adipisci debitis dolore quibusdam?'
      });
    }
  });

	$scope.newStudent = {};
	$scope.newStudent.name = 'dan'

}]);
