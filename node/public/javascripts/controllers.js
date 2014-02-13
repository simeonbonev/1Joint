angular.module('1Joint', ['ngResource']);

//var User = $resource

function TodoCtrl($scope, $http) {
	$scope.totalTodos = 4;

	$scope.signIn = function () {
		console.log("signIn was clicked");
		var data = new Object();
		data.username = $scope.loginFormEmail;
		data.password = $scope.loginFormPassword;
		$http.post('/login', data);
	};
}