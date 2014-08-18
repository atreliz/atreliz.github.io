'use strict';

angular.module('ProfileApp')
  .controller('welcomeCtrl',['$scope','GitHubApi', function ($scope,GitHubApi) {


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

		



  }]);
