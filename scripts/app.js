  /*Made by AlexT */
  /*Using http://krispo.github.io/angular-nvd3/#/quickstart */
  /*Tool to check JSOn format  http://jsonlint.com/ */
  
'use strict';

angular.module('ProfileApp', ['ngRoute','nvd3','APIServices'])
  .config(['$routeProvider', '$httpProvider','$compileProvider', function ($routeProvider,$httpProvider,$compileProvider) {


    /*$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];*/
    
    $routeProvider
    //POC EXAMPLES
      .when('/example1', {
        templateUrl: 'views/site/example1.html',
        controller: 'example1Ctrl'
      })
      .when('/example2', {
        templateUrl: 'views/site/example2.html',
        controller: 'example2Ctrl'
      })
      .when('/example3', {
        templateUrl: 'views/site/example3.html',
        controller: 'example3Ctrl'
      })
      .when('/example4', {
        templateUrl: 'views/site/example4.html',
        controller: 'example4Ctrl'
      })
      .when('/example5', {
        templateUrl: 'views/site/example5.html',
        controller: 'example5Ctrl'
      })
      .when('/example6', {
        templateUrl: 'views/site/example6.html',
        controller: 'example6Ctrl'
      })
    //MAIN PROJECT
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


//Linkedin
//https://developer.linkedin.com/documents/javascript-api-tutorial

  /*var allfields=["first-name","last-name","headline","location:(name)","picture-url","email-address","phone-numbers","languages","industry","num-connections","last-modified-timestamp","publications","certifications","educations","courses","positions","num-recommenders","recommendations-received","skills","group-memberships","network"];


   // 1. Runs when the JavaScript framework is loaded
    function onLinkedInLoad() {
      IN.Event.on(IN, "auth", onLinkedInAuth);
    }

    // 2. Runs when the viewer has authenticated
    function onLinkedInAuth() {
      IN.API.Profile("me").fields(allfields).result(displayProfiles);
    }


    function displayProfiles(profiles) {
         console.info("Linkedin profile");
         console.log(profiles);
         linkedinData=profiles;  
    }*/


  



