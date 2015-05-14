sms.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'student', 'students', function ($scope, $modalInstance, student, students) {
  $scope.studentsRef = students;
  $scope.studentCopy = student;
  $scope.student = student;

  $scope.save = function(){
    $scope.studentsRef.$save($scope.student);
    $modalInstance.close();
  };

  $scope.cancel = function () {

    $modalInstance.close();
  };
}]);
