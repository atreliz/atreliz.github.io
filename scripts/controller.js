'use strict';

angular.module('ProfileApp')
  	.controller('loadConfigCtrl',['$scope','$rootScope','$http','configFile','GitHubApi', function ($scope,$rootScope,$http,configFile,GitHubApi) {

		$rootScope.mode="config";//this will let you use different css on config and welcome page
		console.log("loadConfigCtrl controller loaded,css mode: "+$rootScope.mode);
		//all data will be reusable from here
		$rootScope.apiProfile={ "github":{},"twitter":{},"linkedin":{},"extra":{} };


		//-1--Get config file- Need to make all calls and get API datas
		$scope.loadConfiguration = function(file) {
			console.info("--> loadConfiguration");
  			configFile.loadconfig(file).then(
	            function(response) { //success
	            	$rootScope.config=response;
	            	$rootScope.configSTR=JSON.stringify(response, 2, "\t");

	            	//load data from
	            	//github
	            		$scope.connectGithub($rootScope.config.github.user);
	            	//twitter
	            		$scope.loadTweets($rootScope.config.twitter.userCredential,$rootScope.config.twitter.user);
	            	//linkedin this will take data if you are login.But the mock data will date from a JSON file
	            		$scope.reloadLinkedin();

	            }, function(response) {//failed
	            	console.error("Error getting profile.json");
                	console.log(response);
            });

	    };

  		$scope.loadConfiguration("profile.json");

  		//-2--Get linkedin profile from file
		$scope.loadConfiguration = function(file) {
			console.info("--> load Linkedin Profile from file");
  			configFile.loadconfig(file).then(
	            function(response) { //success
	            	$rootScope.apiProfile.linkedin=response;
	            }, function(response) {//failed
	            	console.error("Error getting linkedin.json");
                console.log(response);
            });

	    };

  		
  		$scope.loadConfiguration("linkedin.json");

  		//-3--Fell free to add some extra data 
  		// I have added this because Linkedin does not let you take your summary and other data with his API
		$scope.loadConfiguration = function(file) {
			console.info("--> load Linkedin Profile from file");
  			configFile.loadconfig(file).then(
	            function(response) { //success
	            	$rootScope.apiProfile.extra=response;
	            }, function(response) {//failed
	            	console.error("Error getting extra.json");
                console.log(response);
            });

	    };

  		
  		$scope.loadConfiguration("extra.json");
  		


		//-----GITHUB
	  		$scope.connectGithub = function(user) {
				console.info("--> connectGithub");
				GitHubApi.getUserData(user).then(
		            function(response) { //success
		            	$rootScope.githubUser=response;
		            	$rootScope.apiProfile.github.user=response;
		                //console.log(response);
		            }, function(response) {//failed
		                console.log(response);
		            });

				GitHubApi.getRepos(user).then(
		            function(response) { //success
		            	$rootScope.githubRepos=response;
		            	$rootScope.apiProfile.github.repos=response;
		                //console.log(response);
		            }, function(response) {//failed
		                console.log(response);
		            });
				};

		//---- TWITTER



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
					                
					                $rootScope.config.twitter.userCredential={
					                    "token": reply.oauth_token,
					                    "tokenSecret": reply.oauth_token_secret
					                };; //update it
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
											            $rootScope.apiProfile.twitter=reply.statuses;
											             console.info("-------");
											            console.info(reply.statuses);
											            
											        });
										        
										    }
										);


					    };
					    


		//--Linkedin

				var allfields=["first-name","last-name","headline","location:(name)","picture-url","email-address","phone-numbers","languages","industry","num-connections","last-modified-timestamp","publications","certifications","educations","courses","positions","num-recommenders","recommendations-received","skills","group-memberships","network"];

				   // 1. Runs when the JavaScript framework is loaded
				    function onLinkedInLoad(e) {
				      IN.Event.on(IN, "auth", onLinkedInAuth);
				      
				    }

				    // 2. Runs when the viewer has authenticated
				    function onLinkedInAuth(e) {
				    	console.info(IN);
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
			        

  	}])

  	.controller('welcomeCtrl',['$scope','$rootScope','$timeout', function ($scope,$rootScope,$timeout) {
  		$rootScope.mode="cv";
		console.log("welcome controller loaded,css mode: "+$rootScope.mode);
		//Made a call to get data from apis using the data config
		//api data to scope

		$timeout(function(){


				 $("#recomendations").owlCarousel({
				      navigation : true, // Show next and prev buttons
				      slideSpeed : 300,
				      paginationSpeed : 400,
				      singleItem:true
				 
				  });

 

			$('a').click(function(){
					    $('html, body').animate({
					        scrollTop: $( $.attr(this, 'href') ).offset().top
					    }, 500);
					    return false;
					});
		}, 0);

		

  	}])
  	.controller('newelcomeCtrl',['$scope','$rootScope','$timeout', function ($scope,$rootScope,$timeout) {
  		$rootScope.mode="cv";
		console.log("welcome controller loaded,css mode: "+$rootScope.mode);
		//Made a call to get data from apis using the data config
		//api data to scope

		$timeout(function(){


				 $("#recomendations").owlCarousel({
				      navigation : true, // Show next and prev buttons
				      slideSpeed : 300,
				      paginationSpeed : 400,
				      singleItem:true
				 
				  });

 
			//Anchor navigator
			$('a').click(function(){
					    $('html, body').animate({
					        scrollTop: $( $.attr(this, 'href') ).offset().top -60
					    }, 500);
					    return false;
			});



			//detec vertical scroll position
			$(window).scroll(function() {
			    var height = $(window).scrollTop();
			    //console.log(height);

			    if(height  > 300) {

			    	$('#intro .options').addClass('fix');
			        // do something
			    }else{
			    	$('#intro .options').removeClass('fix');
			    }
			});

		}, 0);

		

  	}])

  	.controller('graphsCtrl',['$scope','$rootScope', function ($scope,$rootScope) {



  		/*----- BAR CHART ------*/
  				$scope.optionsBAR = {
				    chart: {
				        type: 'discreteBarChart',
				        height: 450,
				        margin : {
				            top: 20,
				            right: 20,
				            bottom: 60,
				            left: 55
				        },
				        x: function(d){ return d.label; },
				        y: function(d){ return d.value; },
				        showValues: true,
				        valueFormat: function(d){
				            return d3.format(',.4f')(d);
				        },
				        transitionDuration: 500,
				        xAxis: {
				            axisLabel: 'X Axis'
				        },
				        yAxis: {
				            axisLabel: 'Y Axis',
				            axisLabelDistance: 30
				        }
				    }
				};

  				$scope.dataBAR = [{
				    key: "Cumulative Return",
				    values: [
				        { "label" : "A" , "value" : -29.765957771107 },
				        { "label" : "B" , "value" : 50 },
				        { "label" : "C" , "value" : 32.807804682612 },
				        { "label" : "D" , "value" : 196.45946739256 },
				        { "label" : "E" , "value" : 20.19434030906893 },
				        { "label" : "F" , "value" : -98.079782601442 },
				        { "label" : "G" , "value" : -13.925743130903 },
				        { "label" : "H" , "value" : -5.1387322875705 },
				        { "label" : "I" , "value" : 5 },
				        { "label" : "J" , "value" : 62.807804682612 },
				        { "label" : "K" , "value" : 16.45946739256 },
				        { "label" : "L" , "value" : 6.19434030906893 },
				    ]
				}];


				$scope.optionsBARLanguages= {
				    chart: {
				        type: 'discreteBarChart',
				        height: 420,
				        margin : {
				            top: 20,
				            right: 20,
				            bottom: 60,
				            left: 55
				        },
				        x: function(d){ return d.label; },
				        y: function(d){ return d.value; },
				        showValues: true,
				        valueFormat: function(d){
				            return d;
				        },
				        transitionDuration: 500,
				        xAxis: {
				            axisLabel: ''
				        },
				        yAxis: {
				            axisLabel: '',
				            axisLabelDistance: 150
				        }
				    }
				};

  				$scope.dataBARLanguages = [{
				    key: "Languages",
				    values: [
				        { "label" : "French" , "value" : 5 },
				        { "label" : "Portuguese" , "value" : 6 },
				        { "label" : "Spanish" , "value" : 10 },
				        { "label" : "English" , "value" : 9 },
				        { "label" : "Japanese" , "value" : 3 }
				    ]
				}];



  		/*----- PIE CHART ------*/

		$scope.optionsPIE = {
            chart: {
                type: 'pieChart',
                height: 450,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                transitionDuration: 500,
                labelThreshold: 0.01,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.dataPIE = [
            { key: "One",    y: 5   },
            { key: "Two",    y: 2   },
            { key: "Three",  y: 9   },
            { key: "Four",   y: 7   },
            { key: "Five",   y: 4   },
            { key: "Six",    y: 3   },
            { key: "Seven",  y: .5  }
        ];

        $scope.dataPIEFront = [
            { key: "AngularJS",    y: 90   },
            { key: "JQUERY",    y: 70   },
            { key: "D3",  y: 70   },
            { key: "Bower",   y: 60   },
            { key: "CSS3",   y: 75   },
            { key: "HTML5",    y: 80   },
            { key: "Phonegap",    y: 60   },
            { key: "Responsive",  y: 80  }
        ];

        $scope.dataPIEBack = [
            { key: "NodeJS",    y: 75   },
            { key: "AWS EC2",    y: 60   },
            { key: "APIs",    y: 70   },
            { key: "Grunt/Gulp",    y: 70   },
            { key: "EXPRESS",   y: 75   },
            { key: "WORDPRES",    y: 60   },
            { key: "PHP",  y: 40  }
        ];


		/*------ Horizontal BAR-----*/


        $scope.optionsHBAR = {
            chart: {
                type: 'multiBarHorizontalChart',
                height: 450,
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showControls: false,
                showValues: false,
                duration: 500,
                xAxis: {
                    showMaxMin: true
                },
                yAxis: {
                    axisLabel: 'Values',
                    tickFormat: function(d){
                        return d;
                    }
                },
                margin:{
                	left:150
                }
            }
        };

        $scope.dataHBar = [
            {
                "key": "Front End",
                "color": "#1f77b4",
                "values": [
                    {
                        "label" : "HTML5" ,
                        "value" : 9
                    } ,
                    {
                        "label" : "CSS3" ,
                        "value" : 9
                    } ,
                    {
                        "label" : "AngularJS" ,
                        "value" : 9
                    } ,
                    {
                        "label" : "JQUERY" ,
                        "value" : 8
                    } ,
                    {
                        "label" : "D3" ,
                        "value" : 7
                    } ,
                    {
                        "label" : "Phonegap" ,
                        "value" : 7
                    } ,
                    {
                        "label" : "Responsive Design" ,
                        "value" : 7
                    }
                ]
            },
            {
                "key": "Back End",
                "color": "#d62728",
                "values": [
                    {
                        "label" : "NodeJS" ,
                        "value" : 7
                    } ,
                    {
                        "label" : "Grunt,Gulp,Bower" ,
                        "value" : 7
                    },
                    {
                        "label" : "Amazon Web Services" ,
                        "value" : 6
                    },
                    {
                        "label" : "PHP" ,
                        "value" : 5
                    },
                    {
                        "label" : "WORDPRESS" ,
                        "value" : 6
                    },
                    {
                        "label" : "EXPRESS" ,
                        "value" : 7
                    }
                ]
            }
        ]


  	}])

  	.controller('twitterCtrl',['$scope','$rootScope','$timeout', function ($scope,$rootScope,$timeout) {


			 
				 	
			  



  	}])
  	.controller('jobsCtrl',['$scope','$rootScope','$timeout', function ($scope,$rootScope,$timeout) {



  		$timeout(function(){


				 $("#jobs").owlCarousel({
				      navigation : true, // Show next and prev buttons
				      slideSpeed : 300,
				      paginationSpeed : 400,
				      singleItem:true
				 
				  });

 

		}, 0);
	}])
  	.controller('infographicCtrl',['$scope','$rootScope','$timeout', function ($scope,$rootScope,$timeout) {


			 
				 	
			  



  


  }]);

  	
