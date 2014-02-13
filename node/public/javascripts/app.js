var oneJointApp = angular.module('1Joint', [
	'ngRoute',
	'1JointControllers'
	]);

oneJointApp.config(['$routeProvider', 
	function($routeProvider) {
		$routeProvider.
			when('/home', {
				templateUrl: 
				controller: 'MapController'
			}).
			when('/', {
				templateUrl: 'partials/login.html'
				controller: 'TodoController'
			})

			.otherwise({
				redirectTo: '/home'
			});
	}]);