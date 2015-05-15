sms.controller('RatingCtrl', ['$scope', 'students', function ($scope, students) {
  $scope.studentsRef = students.getStudents();

  $scope.isReadonly = false;
  $scope.activeRating;

  $scope.onLeave = function(){
    $scope.activeRating = '';
  };

  $scope.hoveringOver = function(value) {
    $scope.activeRating = value;
  };

  $scope.logRating = function(student) {
    var heartData = {
      value: $scope.activeRating,
      logged: Date.now(),
      author: "Mary"
    }
    students.logHeart(student.$id, heartData)
  };
}]);
