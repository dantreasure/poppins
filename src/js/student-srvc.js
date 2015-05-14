sms.factory("students", ["$firebaseArray",
  function($firebaseArray) {
    var ref = new Firebase("https://student-management.firebaseio.com/");

    return $firebaseArray(ref);
  }
]);
