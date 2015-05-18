(function(window, document, undefined) {
'use strict';
var sms = angular.module('sms', ['ui.router', 'firebase', 'ui.bootstrap', 'angular-chartist', 'angularMoment', 'ngCookies']);

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

sms.controller('adminCtrl', ['$scope', 'students', 'poppins', function($scope, students, poppins) {
	$scope.students = students.getStudents();
  $scope.poppins = poppins;

  $scope.newChallenge = '';

  $scope.cancelChallenge = function(){
    $scope.newChallenge = '';
  };

  $scope.submitChallenge = function () {
    $scope.poppins.saveChallenge($scope.newChallenge);
    $scope.cancelChallenge();
  };

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
      log: [{'created': Date.now(), 'body': 'Student added to Poppins.', 'author': 'Mary'}],
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

sms.controller('homeCtrl', ['$scope', 'poppins', function($scope, poppins) {
	$scope.dailyChallenge = poppins.getChallenge();
	$scope.challengeSubmission = {};

	$scope.submitAnswer = function(){
		poppins.saveAnswer($scope.challengeSubmission);
		$scope.challengeSubmission = {};
	}

}]);

sms.controller('indexCtrl', ['$scope', '$location', function($scope) {

}]);

sms.controller('ModalCtrl', ['$scope', '$modal',  function ($scope, $modal) {
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

  $scope.student = student;

  $scope.save = function(){
    $scope.studentsRef.$save($scope.student);
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $scope.studentsRef.$save($scope.copy);
    $modalInstance.close();
  };
}]);

sms.factory("poppins", ["$firebaseObject", "$firebaseArray",
  function($firebaseObject, $firebaseArray) {
    var challengeRef = new Firebase("https://poppins.firebaseio.com/dailyChallenge");
  	var challenge = $firebaseObject(challengeRef);

    var poppins = {};

    poppins.getChallenge = function(){
    	return challenge
    };

    poppins.saveChallenge = function(question){
    	challenge.question = question;
    	challenge.$save();
    };

    poppins.saveAnswer = function(answer){
    	var answersRef = new Firebase("https://poppins.firebaseio.com/dailyChallenge/answers");
    	var answers = $firebaseArray(answersRef);
    	answers.$add(answer);
    }

    return poppins;

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

sms.controller('ReportModalCtrl', ['$scope', '$modal', 'students', function ($scope, $modal, students) {
  $scope.animationsEnabled = true;

  $scope.open = function (size, student) {
    $scope.hearts = students.getHearts(student.$id);
    $scope.logs = students.getLogs(student.$id);
    $scope.student = student

    $scope.hearts.$loaded(function() {
      $scope.logs.$loaded(function() {
        console.log($scope.logs)
        var modalInstance = $modal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'reportModal.html',
          controller: 'ReportModalInstanceCtrl',
          size: size,
          resolve: {
            student: function () {
              return $scope.student;
            },
            hearts: function () {
              return $scope.hearts;
            },
            logs: function () {
              return $scope.logs;
            }
          }
        });
      });
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

}]);

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

sms.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

sms.controller('staffCtrl', ['$scope', '$http', '$filter', 'students', function($scope, $http, $filter, students) {
	$scope.students = students.getStudents();

	$scope.ordering = '';

	$scope.mentor = '';

	$scope.setOrder = function(order){
		//It's a fool's errand trying to follow this. Just understand it allows for
		//the ordering to flow through 3 states of on, on-reverse, off
		if($scope.ordering === order){
			if($scope.ordering.charAt(0) !== '-'){
				$scope.ordering = '-' + $scope.ordering;
			}
		} else{
			if($scope.ordering === '-' + order){
				$scope.ordering = '';
			} else{
				$scope.ordering = order;
			}

		}
	};

	$scope.setMentor = function(mentor){
		$scope.mentor = mentor
	};
	//TODO: Refactor this to allow switching between mentor filters
	$scope.$watch('mentor', function(newValue, oldValue) {
		if(newValue !== ''){
			$scope.students = $filter('filter')($scope.students, {mentor:$scope.mentor});
		} else{
			$scope.students = students.getStudents();
		}
	});
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
    	return studentHearts;
    };

    students.getLogs = function(refrnc){
        var studentRef = new Firebase("https://student-management.firebaseio.com/" + refrnc + "/log")
        var studentLogs = $firebaseArray(studentRef);
        return studentLogs;
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

sms.controller('WelcomeModalInstanceCtrl', ['$scope', '$modalInstance', '$cookies', function ($scope, $modalInstance, $cookies) {
	$scope.close = function(){
		$cookies.welcomed = true;

		$modalInstance.close();
	};
}]);

})(window, document);
