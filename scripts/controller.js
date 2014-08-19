'use strict';

angular.module('ProfileApp')
  	.controller('loadConfigCtrl',['$scope','$rootScope','$http','configFile', function ($scope,$rootScope,$http,configFile) {

		$scope.loadConfiguration = function() {
			console.info("--> loadConfiguration");
  			configFile.loadconfig().then(
	            function(response) { //success
	            	$rootScope.config=response;
	            	$rootScope.configSTR=JSON.stringify(response, 2, "\t");
	                //console.log(response);
	            }, function(response) {//failed
	                console.log(response);
	            });
  		};

  		$scope.loadConfiguration();

  	}])
  	.controller('gitHubCtrl',['$scope','$rootScope','$http','GitHubApi', function ($scope,$rootScope,$http,GitHubApi) {


		$scope.connectGithub = function(user) {
			console.info("--> connectGithub");
			GitHubApi.getUserData(user).then(
	            function(response) { //success
	            	$rootScope.githubUser=response;
	                //console.log(response);
	            }, function(response) {//failed
	                console.log(response);
	            });

			GitHubApi.getRepos(user).then(
	            function(response) { //success
	            	$rootScope.githubRepos=response;
	                //console.log(response);
	            }, function(response) {//failed
	                console.log(response);
	            });
			};

			//by default try to load
			$scope.connectGithub($rootScope.config.github.user);
			

  	}])
  	.controller('twitterCtrl',['$scope','$rootScope','$http', function ($scope,$rootScope,$http) {

			//config,Twitter User

			//config twitter app conection
			//info about the library
			//https://github.com/jublonet/codebird-js
			    var cb = new Codebird; 
			    //developer APP "YOURKEY" and "YOURSECRET"
				//Twitter app credentials created before
			    var TWkey="3cKRfCeMqCv2HbecGCkGXLEtX";
			    var TWsecret="Z9E0NDUbCdBKkvAd0HBe3DDtaKPxwGeyMe9kTKY5061AneXyaP";
			    cb.setConsumerKey(TWkey, TWsecret);


			    $scope.twitterAsk = function() { //not ready
			    	console.info("--> twitterAsk");

			        cb.__call(
			            "oauth_requestToken", {
			                oauth_callback: "oob"
			            },
			            function(reply) {
			                // stores it
			                cb.setToken(reply.oauth_token, reply.oauth_token_secret);
			                //console.log("oauth_requestToken");
			                //console.log(reply);
			                // gets the authorize screen URL
			                cb.__call(
			                    "oauth_authorize", {},
			                    function(auth_url) {
			                        window.codebird_auth = window.open(auth_url);
			                    }
			                );
			            }
			        );
			    };

			    $scope.twitterJoin = function() {

			        cb.__call(
			            "oauth_accessToken", {
			                oauth_verifier: document.getElementById("PINFIELD").value
			            },
			            function(reply) {
			                // store the authenticated token, which may be different from the request token (!)
			                cb.setToken(reply.oauth_token, reply.oauth_token_secret);
			                var data = {
			                    "token": reply.oauth_token,
			                    "tokenSecret": reply.oauth_token_secret
			                };
			                //console.info(data);
			                $rootScope.config.twitter.userCredential=data; //update it
			            }
			        );
			    };

			    $scope.loadTweets = function(credentials,twitterUser) {
			    	console.info("--> loadTweets");
			    	//console.log(credentials);
			    	//console.log(twitterUser);

			    	cb.setToken(credentials.token, credentials.tokenSecret);

							    
								cb.__call(
								    "search_tweets",
								    "q="+twitterUser,
								    function (reply, rate_limit_status) {
								    	//console.info("query");
								        //console.log(rate_limit_status);
								        //console.log(reply);
								          	$scope.$apply(function () {
									            $rootScope.tweets= reply.statuses;
									        });
								        
								    }
								);


			    };
			    //call by default, on reload
			    $scope.loadTweets($rootScope.config.twitter.userCredential,$rootScope.config.twitter.user);


							    

				//var twdata={token: "232702301-r1C2nCEa04WQeKjroLqka6bDaGSrzEclFI9cSC3N", tokenSecret: "F5W7Uhbx7c3YzFJGnLGZhRnVvybQMR2s34HucbO7bf4sR"};
			    //cb.setToken("YOURTOKEN", "YOURTOKENSECRET");
			    

     }])
  	.controller('linkedinCtrl',['$scope','$rootScope', function ($scope,$rootScope) {


		  	var allfields=["first-name","last-name","headline","location:(name)","picture-url","email-address","phone-numbers","languages","industry","num-connections","last-modified-timestamp","publications","certifications","educations","courses","positions","num-recommenders","recommendations-received","skills","group-memberships","network"];

		   // 1. Runs when the JavaScript framework is loaded
		    function onLinkedInLoad(e) {
		      IN.Event.on(IN, "auth", onLinkedInAuth);
		      
		    }

		    // 2. Runs when the viewer has authenticated
		    function onLinkedInAuth(e) {
		    	//console.info(IN);
		      IN.API.Profile("me").fields(allfields).result(displayProfiles);
		    }


	        function displayProfiles(profiles) {
	        	console.info("--> Linkedin profile");
	        	//console.log(profiles);
	        	$scope.$apply(function () {
		            $rootScope.linkedinData = profiles.values[0];
	            	//console.log($rootScope.linkedinData);
		        });
	            
	        }

	        $scope.reloadLinkedin = function(user) {
	        	onLinkedInLoad();
	        }

	        //bydefault make a call
	        $scope.reloadLinkedin();
	        


	}])
  	.controller('welcomeCtrl',['$scope','GitHubApi', function ($scope,GitHubApi) {





  }]);
