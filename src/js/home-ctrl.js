proef.controller('homeCtrl', ['$scope', 'background', function($scope, background) {
  $scope.messages = [
    '-(n) dutch: to try out, test, experiment',
    'Each answer is measured, each project is its own',
    'this is the third quote',
    'this is the fourth quote',
    'this is the fifth quote'
  ]
  $scope.message = 0;

  $scope.previousQuote = function(){
    if ($scope.message !== 0){
      $scope.message--;
    }
    background.decrementBackground();
  };

  $scope.nextQuote = function(){
    if ($scope.message !== 4){
      $scope.message++;
    }
    background.incrementBackground();
  };

}]);
