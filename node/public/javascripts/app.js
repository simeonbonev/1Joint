var oneJointApp = angular.module('oneJointApp', [
	'ngRoute',
	'oneJointControllers',
	'oneJointServices'
	]);

oneJointApp.directive('helloMaps', function () {
      return function (scope, elem, attrs) {
        var mapOptions,
          latitude = attrs.latitude,
          longitude = attrs.longitude,
          map;

        latitude = latitude && parseFloat(latitude, 10) || 43.074688;
        longitude = longitude && parseFloat(longitude, 10) || -89.384294;

        mapOptions = {
          zoom: 8,
          center: new google.maps.LatLng(latitude, longitude)
        };

        map = new google.maps.Map(elem[0], mapOptions);
      };
    });    

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
			}).
			when('/register', {
				templateUrl: 'partials/register.html',
				controller: 'RegisterController'
			}).
			when('/registerPoi', {
				templateUrl: 'partials/registerPoi.html',
				controller: 'RegisterPoiController'
			})

			.otherwise({
				redirectTo: '/home'
			});
	}]);