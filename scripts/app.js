  /*Made by AlexT */
  /*Using http://krispo.github.io/angular-nvd3/#/quickstart */
  /*Tool to check JSOn format  http://jsonlint.com/ */
  
'use strict';

angular.module('ProfileApp', ['ngRoute','APIServices'])
  .config(['$routeProvider', '$httpProvider','$compileProvider', function ($routeProvider,$httpProvider,$compileProvider) {


    /*$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];*/
    
    $routeProvider
      .when('/config', {
        templateUrl: 'views/config.html'
      })
      .when('/twitter', {
        templateUrl: 'views/twitter.html',
        controller: 'twitterCtrl'
      })
      .when('/', {
        templateUrl: 'views/welcome.html',
        controller: 'welcomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

  //----- Main configuration ----//

  //users credentials
    var user={
      github:"atreliz",
      linkedin:"atreliz",
      twitter:"atreliz"
    };


  //site Urls
    var serviceUrl;
    var url={
      github:"https://api.github.com",
      linkedin:"atreliz",
      twitter:"atreliz"
    };

    var linkedinData;



    //detect the Git hub user from query param, or atreliz as default
    //ie: http://localhost:9000/#/?github=Quaiks

      function detectGitHubUserOnQuery(){
            if(location.hash.indexOf("#/?github=")>=0){
                return location.hash.replace("#/?github=","");
            }else{
              return "atreliz";
            }
        };

       user.github=detectGitHubUserOnQuery();

  



