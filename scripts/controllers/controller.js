'use strict';

angular.module('ProfileApp')
  	.controller('welcomeCtrl',['$scope','GitHubApi','LinkedinApi', function ($scope,GitHubApi,LinkedinApi) {


		  //data to save data from apis
		    $scope.profileData={
		      github:{
		        user:"",
		        repos:""
		      },
		      linkedin:{}

		    };
    

			GitHubApi.getUserData(user.github).then(
	            function(response) { //success
	            	$scope.profileData.github.user=response;
	                console.log(response);
	            }, function(response) {//failed
	                console.log(response);
	            });

			GitHubApi.getRepos(user.github).then(
	            function(response) { //success
	            	$scope.profileData.github.repos=response;
	                console.log(response);
	            }, function(response) {//failed
	                console.log(response);
	            });


/*

			LinkedinApi.getUserData(user.linkedin).then(
	            function(response) { //success
	            	$scope.profileData.linkedin=response;
	                console.log(response);
	            }, function(response) {//failed
	                console.log(response);
	            });
*/

			



				     
				//how to ask using the js api and rest
				   /* $scope.linkedinPOST = function(value) {
				        IN.API.Raw("/people/~/current-status") // Update (PUT) the status
				        .method("PUT")
				            .body(JSON.stringify(value))
				            .result(function(result) {
				                console.log("Status updated");
				            })
				            .error(function(error) {
				                console.log("Status ERROR");
				            });
				    }; //linkedinPOST
				    */


			var allfields=["first-name","last-name","headline","location:(name)","picture-url","email-address","phone-numbers","languages","industry","num-connections","last-modified-timestamp","publications","certifications","educations","courses","positions","num-recommenders","recommendations-received","skills","group-memberships","network"];

		   // 1. Runs when the JavaScript framework is loaded
		    function onLinkedInLoad() {
		      IN.Event.on(IN, "auth", onLinkedInAuth);
		    }

		    // 2. Runs when the viewer has authenticated
		    function onLinkedInAuth() {
		      IN.API.Profile("me").fields(allfields).result(displayProfiles);
		    }


	        function displayProfiles(profiles) {
	        	console.log(profiles);
	        	$scope.$apply(function () {
		            $scope.profileData.linkedin = profiles.values[0];
	            	console.log($scope.profileData.linkedin);
		        });
	            
	        }
	        onLinkedInLoad();




		



  }]);
