sms.controller('ReportModalInstanceCtrl', ['$scope', '$modalInstance', 'student', 'students','hearts', function ($scope, $modalInstance, student, students, hearts) {
  $scope.hearts = hearts;
  $scope.student = student;
  $scope.range = 31;

  $scope.setRange = function(range){
    $scope.range = range;
    $scope.lineData.labels = new Array(range);
  };

  //TODO: Insert a class average, and a series showing team point
  $scope.lineData = {
    labels: new Array(31),
    series: [
      {
    		name: 'dummy data',
        data: [1,4,2,5]
      }
    ],
    showArea: true
  };

  $scope.events = {

  };

  $scope.lineOptions = {
    axisX: {
      labelInterpolationFnc: function(value) {
        return value;
      }
    },
    low: 0,
		showArea: true
  };
}]);
