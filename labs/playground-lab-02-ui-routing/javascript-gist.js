angular.module('play', ['ionic'])

	.controller("HelloCtrl", function ($scope) {
		$scope.firstname = '';
	})

	.config(function ($stateProvider, $urlRouterProvider) {
		$stateProvider

			.state('main', {
				url: "/main",
				templateUrl: "templates/main.html",
				controller: 'HelloCtrl'
			})

			.state('page2', {
				url: "/page2",
				templateUrl: "templates/page2.html",
			})
  
		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('/main');
	});