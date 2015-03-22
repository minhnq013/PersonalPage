'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: '/partial/view1',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http) {
	$scope.data = null;

	getSchedules({
		'stopIds': [13210, 29273, 13240],
		'callback': function(schedules){
			$scope.data = schedules;
		}
	});

	function getSchedules(params, options){
		var stopIds = params['stopIds'].join(',');
		var callback = params['callback'];
		$http({
			method: 'GET',
			url: '/bus',
			params: {
				stopIds: stopIds
			}
		}).success(callback)
		.error(function(errors){ console.log(errors)});
	}
});