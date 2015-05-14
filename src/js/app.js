var sms = angular.module('sms', ['ui.router']);

sms.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "../partials/home.html",
      controller: "homeCtrl"
    })

    $locationProvider.html5Mode({enabled: true, requireBase: false})
});



