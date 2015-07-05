'use strict';

angular.module('myApp.view1', ['ngRoute', 'smart-table'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: '/partial/view1',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
	$scope.data = [];

	$scope.getSchedules = function(params, options){
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

	$scope.getSchedules({
		'stopIds': [13210, 29273, 13240],
		'callback': function(schedules){
			$scope.data = _.map(schedules, function(time){
				return {
					busNumber: time.busNumber,
					location: time.arrivalsStopAddress,
					destination: time.arrivalsDestination,
					arrivalsTime: time.arrivalsTime,
					arrivalsStatus: time.arrivalsStatus
				};
			});
			console.log($scope.data);
		}
	});
}])
;