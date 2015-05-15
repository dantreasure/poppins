sms.controller('adminCtrl', ['$scope', 'students', 'poppins', function($scope, students, poppins) {
	$scope.students = students.getStudents();
  $scope.poppins = poppins;

  $scope.newChallenge = '';

  $scope.cancelChallenge = function(){
    $scope.newChallenge = '';
  };

  $scope.submitChallenge = function () {
    $scope.poppins.dailyChallenge.question = $scope.newChallenge;
    $scope.poppins.$save;
    $scope.cancelChallenge();
  };

	$scope.deleteStudent = function(student){
		$scope.students.$remove(student);
	};

	$scope.addStudent = function(){
		$scope.students.$add({
      first_name: $scope.newStudent.first_name,
      last_name: $scope.newStudent.last_name,
      full_name: $scope.newStudent.first_name + ' ' + $scope.newStudent.last_name,
      mentor: $scope.newStudent.mentor,
      cohort: $scope.newStudent.cohort,
      avatar: $scope.newStudent.avatar,
      phone: $scope.newStudent.phone,
      gender: $scope.newStudent.gender,
      current_city: $scope.newStudent.current_city,
      email: $scope.newStudent.email,
      notes: $scope.newStudent.notes,
      log: [{'created': Date.now(), 'body': 'Student added to Poppins.', 'author': 'Mary'}],
      hearts: [{'logged': Date.now(), 'value': 3, 'author': 'Mary &#10163;'}]
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

	$scope.newStudent = {
		gender: ''
	};

}]);
