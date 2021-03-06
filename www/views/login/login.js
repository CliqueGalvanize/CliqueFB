'Use Strict';

angular.module('App').controller('loginController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup,$firebaseAuth, $firebaseObject,$log, Auth, FURL, Utils) {
  //var ref = new Firebase(FURL);
  var auth = $firebaseAuth();
  //firebase.initializeApp(FURL);
  var ref = firebase.database().ref();

  var userkey = "";
  $scope.signIn = function (user) {
    if(angular.isDefined(user)){
    Utils.show();
    Auth.login(user).then(function(authData) {

      $log.log(user)
      $log.log("Auth Data");
      $log.log(authData);

      // Setting new Login Time
      $localStorage.uid = authData.uid;
      $localStorage.email = authData.email
      var newLogin = Date().toString();
      var usersRef = firebase.database().ref().child('users');
      usersRef.on("value", function(snapshot){
        var userTable = snapshot.val();
        for (var key in userTable) {
          if (userTable[key].id == $localStorage.uid) {
              usersRef.child(key).update({'last_login' : newLogin})

            }
          }
      })



       Utils.hide();
      $state.go('home');
      }, function(err) {
        Utils.hide();
         Utils.errMessage(err);
      });
    }
  };


  $scope.loginWithGoogle =  function(){
  var provider = new firebase.auth.GoogleAuthProvider();

 firebase.auth().signInWithPopup(provider).then(function(result) {

    $log.log("Authenticated successfully with payload:", angular.toJson(result));
    $state.go('home');

  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  $log.error("error:", angular.toJson(error));
});
  ;
  };



/* SEEMS NOT WORKING WELL
  $scope.loginWithFacebook =  function(){
    var provider = new firebase.auth.FacebookAuthProvider();

 firebase.auth().signInWithPopup(provider).then(function(result) {

    $log.log("Authenticated successfully with payload:", angular.toJson(result));
    $state.go('home');

  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  $log.error("error:", angular.toJson(error));
});
  ;
  };
  */


  $scope.loginWithTwitter =  function(){
    var provider = new firebase.auth.FacebookAuthProvider();

 firebase.auth().signInWithPopup(provider).then(function(result) {

    $log.log("Authenticated successfully with payload:", angular.toJson(result));
    $state.go('home');

  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  $log.error("error:", angular.toJson(error));
});
  ;
  };


});
