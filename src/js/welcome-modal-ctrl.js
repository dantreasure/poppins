sms.controller('WelcomeModalCtrl', ['$scope', '$modal', '$cookies', function ($scope, $modal, $cookies) {
  $scope.animationsEnabled = true;

  var welcomeCookie = $cookies.welcomed;

  if (welcomeCookie === false){
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'welcomeModal.html',
      controller: 'WelcomeModalInstanceCtrl',
      size: 'lg',
    });
  }

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

}]);
