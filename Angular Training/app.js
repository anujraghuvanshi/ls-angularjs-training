angular.module('myApp', [])

.factory('SampleInterceptor', function($q) {
	return {
		request: function (config) {
			config.headers = {
				Authorization: 'Bearer sffhjfsdhfjkdshfjkdsgjfsdgjag'
			}
			return config;
		},
		response: function (response) {
			console.log("Got Response");
			return response;
		},
		requestError: function (rejection) {
			console.log("request rejection Error");
			return $q.reject(rejection);
		},
		responseError: function(rejection){
			
			switch (rejection.status) {
				case 0:
					// code...
					alert('Error code 0');
					break;
				case 401:
					// code...
					alert('Not found');
					break;
				case 500:
					alert('An Internal Error occurred');
					// code...
					break;
				default:
					alert('Heres error in request');

			}

			return $q.reject(rejection);
		}
	} 
})
.controller('appController', function(AppService) {
	var viewdata = this;

	viewdata.get200 = get200;
	viewdata.get404 = get404;
	viewdata.get500 = get500;

	function get200(){
		localStorage.setItem('keyName', "KeyValue");
		sessionStorage.setItem('keyName', "KeyValue");
		console.log(localStorage.keyName)

		AppService.getCode(200).then(success, error);
	}

	function get404(){
		AppService.getCode(404).then(success, error);
	}
	function get500(){
		AppService.getCode(500).then(success, error);
	}


	//success function
	function success(response){
		console.log(response);
		viewdata.status = "Success";
		viewdata.data = response;
	}

	//Error
	function error(error){
		viewdata.status = "Error";
		viewdata.data = error;
	}

})

.config(function($httpProvider) {
	$httpProvider.interceptors.push("SampleInterceptor");
})


.service('AppService' ,function($http){

	  //Get the http status
	  this.getCode = function(statusCode){
	    return $http.get("http://httpstat.us/" + statusCode);
	  }
})