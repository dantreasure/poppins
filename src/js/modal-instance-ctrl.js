sms.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'student', 'students', function ($scope, $modalInstance, student, students) {
  $scope.studentsRef = students.getStudents();

  $scope.student = student;

  $scope.save = function(){
    $scope.studentsRef.$save($scope.student);
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $scope.studentsRef.$save($scope.copy);
    $modalInstance.close();
  };
}]);
