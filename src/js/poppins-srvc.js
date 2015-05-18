sms.factory("poppins", ["$firebaseObject", "$firebaseArray",
  function($firebaseObject, $firebaseArray) {

    var challengeRef = new Firebase("https://poppins.firebaseio.com/dailyChallenge");
  	var challenge = $firebaseObject(challengeRef);

  	var questionRef = new Firebase("https://poppins.firebaseio.com/interviewQuestion");
  	var interviewQuestion = $firebaseObject(questionRef);

  	var answersRef = new Firebase("https://poppins.firebaseio.com/dailyChallenge/answers");
  	var answers = $firebaseArray(answersRef);

    var poppins = {};

    poppins.getInterviewQuestion = function(){
    	return interviewQuestion;
    };

    poppins.saveQuestion = function(question){
    	interviewQuestion.question = question;
    	interviewQuestion.$save();
    }

    poppins.getChallenge = function(){
    	return challenge;
    };

    poppins.saveChallenge = function(question){
    	challenge.question = question;
    	challenge.$save();
    	for(var i=0;i<answers.length;i++){
        if(answers[i].$id.length !== 0){
            answers.$remove(i);
        }
    	}
    };

    poppins.saveAnswer = function(answer){
    	answers.$add(answer);
    }

    return poppins;

}]);
