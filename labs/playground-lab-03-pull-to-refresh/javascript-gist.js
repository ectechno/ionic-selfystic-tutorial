angular.module('play', ['ionic'])

	.controller("HelloCtrl", function ($scope, $timeout) {
		var names = ['Kosala', 'Hasith', 'Chatura', 'Jehan', 'Rashmika', 'Suranga', 'Ruzaik'];

		$scope.firstname = names[0];

		$scope.refresh = function () {
			$timeout(function () {
				$scope.firstname = names[Math.floor(Math.random() * names.length)];
				$scope.$broadcast('scroll.refreshComplete');
			}, 1500);
		};

	});