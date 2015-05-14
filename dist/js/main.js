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

    $locationProvider.html5Mode({enabled: true, requireBase: false})
}]);

sms.controller('homeCtrl', ['$scope', function($scope) {


}]);

sms.controller('indexCtrl', ['$scope', '$location', function($scope) {

}]);

})(window, document);
