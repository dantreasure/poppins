var sms = angular.module('sms', ['ui.router']);

sms.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
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
});



