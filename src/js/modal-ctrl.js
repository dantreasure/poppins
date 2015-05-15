sms.controller('ModalCtrl', ['$scope', '$modal',  function ($scope, $modal) {
  $scope.animationsEnabled = true;

  $scope.open = function (size, student) {
    $scope.student = student
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        student: function () {
          return $scope.student;
        }
      }
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

}]);
