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
