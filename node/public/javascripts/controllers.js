angular.module('1Joint', ['ngResource']);

//var User = $resource

function TodoCtrl($scope, $http) {
	$scope.totalTodos = 4;

	$scope.signIn = function () {
		console.log("signIn was clicked");
		console.log($scope.loginFormEmail);
		console.log($scope.loginFormPassword);
		var data = new Object();
		data.username = $scope.loginFormEmail;
		data.password = $scope.loginFormPassword;
		$http.post('/login', data);
	};
}