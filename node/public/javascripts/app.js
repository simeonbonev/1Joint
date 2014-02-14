var oneJointApp = angular.module('oneJointApp', [
	'ngRoute',
	'oneJointControllers'
	]);

oneJointApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.
			when('/home', {
				templateUrl: 'partials/map.html',
				controller: 'MapController'
			}).
			when('/', {
				templateUrl: 'partials/login.html',
				controller: 'LoginController'
			})

			.otherwise({
				redirectTo: '/home'
			});
	}]);