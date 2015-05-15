sms.controller('ReportModalCtrl', ['$scope', '$modal', 'students', function ($scope, $modal, students) {
  $scope.animationsEnabled = true;

  $scope.open = function (size, student) {
    $scope.hearts = students.getHearts(student.$id);
    $scope.logs = students.getLogs(student.$id);
    $scope.student = student

    $scope.hearts.$loaded(function() {
      $scope.logs.$loaded(function() {
        console.log($scope.logs)
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'reportModal.html',
          controller: 'ReportModalInstanceCtrl',
          size: size,
          resolve: {
            student: function () {
              return $scope.student;
            },
            hearts: function () {
              return $scope.hearts;
            },
            logs: function () {
              return $scope.logs;
            }
          }
        });
      });
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

}]);
