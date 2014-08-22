  /*Made by AlexT */
  /*Using http://krispo.github.io/angular-nvd3/#/quickstart */
  /*Tool to check JSOn format  http://jsonlint.com/ */
  
'use strict';

angular.module('ProfileApp', ['ngRoute','ngSanitize','APIServices'])
  .config(['$routeProvider', '$httpProvider','$compileProvider', function ($routeProvider,$httpProvider,$compileProvider) {


    /*$httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];*/
    
    $routeProvider
      .when('/config', {
        templateUrl: 'views/config.html'
      })
      .when('/', {
        templateUrl: 'views/welcome.html',
        controller: 'welcomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);





/*MAIN CONFIGURATION*/
    /*Alex T Twitter app that get your data*/
        var cb = new Codebird; 
              //developer APP "YOURKEY" and "YOURSECRET"
            //Twitter app credentials created before
              var TWkey="3cKRfCeMqCv2HbecGCkGXLEtX";
              var TWsecret="Z9E0NDUbCdBKkvAd0HBe3DDtaKPxwGeyMe9kTKY5061AneXyaP";
              cb.setConsumerKey(TWkey, TWsecret);


//Notes:
//Github api with no auth, let you get 60request xhour from the same ip
//twitter token does not expirate
//linkedin oauth2 does not let you a continious login


//Feel free to make your own angular template on the welcome.html site
//ALL data will be storage on this object  $rootScope.apiProfile

  



