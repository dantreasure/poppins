sms.factory("poppins", ["$firebaseObject",
  function($firebaseObject) {
    var ref = new Firebase("https://poppins.firebaseio.com/");

    return $firebaseObject(ref);

}]);
