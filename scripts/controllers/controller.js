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

			LinkedinApi.getUserData(user.linkedin).then(
	            function(response) { //success
	            	$scope.profileData.linkedin=response;
	                console.log(response);
	            }, function(response) {//failed
	                console.log(response);
	            });

			

		



  }]);
