sms.controller('ReportModalInstanceCtrl', ['$scope', '$modalInstance', 'student', 'students','hearts', 'logs', function ($scope, $modalInstance, student, students, hearts, logs) {
  $scope.hearts = hearts;
  $scope.logs = logs;
  $scope.student = student;
  $scope.range = 7;
  $scope.newLog = {
    body: '',
    author: 'Mary'
  };

  $scope.addLog = function(){
    $scope.newLog.created = Date.now();
    $scope.logs.$add($scope.newLog);
    $scope.cancelLog();
  };

  $scope.cancelLog = function(){
    $scope.newLog = {
      body: '',
      author: 'Mary'
    };
  };

  $scope.setRange = function(range){
    $scope.range = range;
    $scope.lineData.labels = new Array(range);
  };

  //TODO: Insert a class average, and a series showing team point
  $scope.lineData = {
    labels: new Array(7),
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
		showArea: true,
    width: '100%',
    height: '50%'
  };
}]);
