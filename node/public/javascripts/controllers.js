var oneJointControllers = angular.module('oneJointControllers', []);

oneJointControllers.controller('LoginController', ['$scope', '$http','$location', 
	function($scope, $http, $location) {
		$scope.signIn = function () {
		console.log("signIn was clicked");
		var userData = new Object();
		userData.username = $scope.loginFormEmail;
		userData.password = $scope.loginFormPassword;
		$http.post('/login', userData).success(
				function(data, status, headers, config) {
					if(data.status == 'ok') {
						//$location.path('/home');
						window.location.href='index3.html'
					} else {
						alert('The Email or the password provided are incorrect.');
						$location.path('/');
					}
					$scope.loginFormEmail = '';
					$scope.loginFormPassword = '';
				}
			).error(
				function(data, status, headers, config) {
					alert(status);
				}
			);
		};
		$scope.register = function() {
			console.log($location.path());
			$location.url('register');
		}
		$scope.addPOI = function() {
			$location.path('/registerNewPoi');
		}
	}
]);

oneJointControllers.controller('MapController', ['$scope', '$http','GoogleMaps',
	function ($scope, $http, GoogleMaps) {
		$scope.data = 'MapController Data';

		 
         
	}
]);

oneJointControllers.controller('RegisterController', ['$scope', '$http','$location',
	function ($scope, $http, $location) {
		$scope.signUp = function() {
			console.log($scope.email);
			console.log($scope.password);
			console.log($scope.favourites);
			var data = new Object();
			data.email = $scope.email;
			data.password = $scope.password;
			data.favourites = $scope.favourites;
			$http.post('/adduser', data).success(
				function(data, status, headers, config) {
					alert("Successfully registered.");
					$location.path('/');
				}).error(function(data, status, headers, config) {
					alert(status);
				});
		}
		 
         
	}
]);

oneJointControllers.controller('RegisterPoiController', ['$scope', '$http','$location',
	function ($scope, $http, $location) {
		$scope.data = 'MapController Data';

		 
         
	}
]);





// function TodoCtrl($scope, $http) {

// 	$scope.signIn = function () {
// 		console.log("signIn was clicked");
// 		var data = new Object();
// 		data.username = $scope.loginFormEmail;
// 		data.password = $scope.loginFormPassword;
// 		$http.post('/login', data);
// 	};
// }