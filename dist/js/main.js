(function(window, document, undefined) {
'use strict';
var sms = angular.module('sms', ['ui.router', 'firebase', 'ui.bootstrap']);

sms.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "../partials/home.html",
      controller: "homeCtrl"
    })
    .state('staff', {
      url: "/staff",
      templateUrl: "../partials/staff.html",
      controller: "staffCtrl"
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

sms.controller('adminCtrl', ['$scope', 'students', function($scope, students) {
	$scope.students = students.getStudents();

	$scope.deleteStudent = function(student){
		$scope.students.$remove(student);
	};

	$scope.addStudent = function(){
		$scope.students.$add({
      first_name: $scope.newStudent.first_name,
      last_name: $scope.newStudent.last_name,
      full_name: $scope.newStudent.first_name + ' ' + $scope.newStudent.last_name,
      mentor: $scope.newStudent.mentor,
      cohort: $scope.newStudent.cohort,
      avatar: $scope.newStudent.avatar,
      phone: $scope.newStudent.phone,
      gender: $scope.newStudent.gender,
      current_city: $scope.newStudent.current_city,
      email: $scope.newStudent.email,
      notes: $scope.newStudent.notes,
      log: [{'created': Date.now(), 'body': 'Student added to Poppins.', 'author': 'Mary &#10163;'}],
      hearts: [{'logged': Date.now(), 'value': 3, 'author': 'Mary &#10163;'}]
    });

    $scope.newStudent= {};
	};

	$scope.students.$loaded(function() {
    if ($scope.students.length === 0) {
      $scope.students.$add({
        name: 'daniel treasure',
	      avatar: 'http://blahblahblah',
	      telephone: '801-628-0193',
	      email: 'dbtreasure@gmail.com',
	      notes: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod tempore molestiae dolore fugit. Totam necessitatibus quae explicabo qui vel, iusto nesciunt fuga et, facere, autem optio adipisci debitis dolore quibusdam?'
      });
    }
  });

	$scope.newStudent = {
		gender: ''
	};

}]);

sms.controller('classCupCtrl', ['$scope', function($scope) {


}]);

sms.controller('directoryCtrl', ['$scope', function($scope) {


}]);

sms.controller('homeCtrl', ['$scope', function($scope) {


}]);

sms.controller('indexCtrl', ['$scope', '$location', function($scope) {

}]);

sms.controller('ModalCtrl', ['$scope', '$modal',  function ($scope, $modal) {
  $scope.items = ['item1', 'item2', 'item3'];

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

sms.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'student', 'students', function ($scope, $modalInstance, student, students) {
  $scope.studentsRef = students.getStudents();
  $scope.copy = {};
  $scope.student = student;
  angular.extend($scope.copy, $scope.student);
  $scope.save = function(){
    $scope.studentsRef.$save($scope.student);
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $scope.studentsRef.$save($scope.copy);
    $modalInstance.close();
  };
}]);

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

sms.controller('staffCtrl', ['$scope', 'students', function($scope, students) {
	$scope.students = students.getStudents();

}]);

sms.factory("students", ["$firebaseArray", "$firebaseObject",
  function($firebaseArray, $firebaseObject) {
    var ref = new Firebase("https://student-management.firebaseio.com/");
    var students = {};

    students.getStudents = function(){
    	return $firebaseArray(ref);
    };

    students.getHearts = function(refrnc){
    	var studentRef = new Firebase("https://student-management.firebaseio.com/" + refrnc + "/hearts")
    	var studentHearts = $firebaseArray(studentRef);
    	return studentHearts
    };

    students.logHeart = function(refrnc, heartData){
    	var studentHeartsRef = new Firebase("https://student-management.firebaseio.com/" + refrnc + "/hearts")
    	var studentRef = new Firebase("https://student-management.firebaseio.com/" + refrnc)

    	var studentHearts = $firebaseArray(studentHeartsRef);

    	studentHearts.$add(heartData);

  		studentRef.child('current_heart').set(heartData)
    };

    return students;
  }
]);

})(window, document);
