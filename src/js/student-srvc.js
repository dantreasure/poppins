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
