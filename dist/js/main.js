(function(window, document, undefined) {
'use strict';
var sms = angular.module('sms', ['ui.router']);

sms.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "../partials/home.html",
      controller: "homeCtrl"
    })
    .state('sms', {
      url: "/sms",
      templateUrl: "../partials/sms.html",
      controller: "smsCtrl"
    })
    .state('class-cup', {
      url: "/class-cup",
      templateUrl: "../partials/class-cup.html",
      controller: "classCupCtrl"
    })
    .state('directory', {
      url: "/directory",
      templateUrl: "../partials/directory.html",
      controller: "directoryCtrl"
    })
    .state('admin', {
      url: "/admin",
      templateUrl: "../partials/admin.html",
      controller: "adminCtrl"
    })

    $locationProvider.html5Mode({enabled: true, requireBase: false})
}]);

sms.controller('adminCtrl', ['$scope', function($scope) {
	$scope.newStudent = {};
	$scope.newStudent.name = 'dan'

}]);

sms.controller('classCupCtrl', ['$scope', function($scope) {


}]);

sms.controller('directoryCtrl', ['$scope', function($scope) {


}]);

sms.controller('homeCtrl', ['$scope', function($scope) {


}]);

sms.controller('indexCtrl', ['$scope', '$location', function($scope) {

}]);

sms.controller('smsCtrl', ['$scope', function($scope) {


}]);

})(window, document);
