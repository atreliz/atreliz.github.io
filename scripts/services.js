
angular.module('APIServices', []).
/*GIT HUB API:User public data, User public repos*/
    factory('GitHubApi', ['$q','$http',function($q,$http){
    	

    	//Service to Load Local JSON files
    	function getUserData(user){
			serviceUrl = url.github+"/users/"+user;
	        var deferred = $q.defer();
	        console.log("calling for file");
	        $http({
	            'method': 'GET',
	            'url': serviceUrl
	        }).
	        success(function(data, status) {
	            console.log("YES GH USER DATA");
	            deferred.resolve(data);  
	        }).
	        error(function(data, status) {
	            console.log("NO GH USER DATA");
	            deferred.reject(data); 
	        });
			return deferred.promise;
	    }//factory.getUserData

		//Service to Load  JSON files by REST
	    function getRepos(user){

    		serviceUrl = url.github+"/users/"+user+"/repos";
	        
	        var deferred = $q.defer();
	        console.log("calling for repos");
	        $http({
	            'method': 'GET',
	            'url': serviceUrl 
	        }).
	        success(function(data, status) {
	            console.log("YES GH REPOS");
	            deferred.resolve(data);  
	        }).
	        error(function(data, status) {
	            console.log("NO GH REPOS");
	            deferred.reject(data); 
	        });
			return deferred.promise;
	    }//factory.getRepos



	    return {
    		getUserData:getUserData,
    		getRepos:getRepos
    	};
    }]);