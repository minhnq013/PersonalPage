'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

// var myApp = angular.module('BusMonitorApp', []);
// myApp.controller('ArrivalMonitorCtrl', ['$scope', '$http' ,'$interval', function MainCtrl($scope, $http, $interval) {
//         // Simple GET request example :
//     $scope.result;

//     getData();

//     $interval(getData, 60000);

//     function getData(){
// 	    $http.get('/getBusArrival').
// 	    success(function(data, status, headers, config) {
// 	        parseDataFromHtml(data);
// 	    }).
// 	    error(function(data, status, headers, config) {
// 	        console.error(data);
// 	    });
//     }

//     function parseDataFromHtml(html){
//     	var jHtml = jQuery.parseHTML(html);
//     	_.each(jHtml, function(elem){
//     		if (elem.id === 'wrapper'){
//     			var jWrap = jQuery(elem);
    			
//     			var address = jWrap.find('.arrivalsStopAddress')[0].innerText;
//     			var rows  = jWrap.find('.arrivalsRow');
//     			var table = jQuery('<table><tbody></tbody></table>');

//     			jQuery('#timetable').empty();
//     			jQuery('#timetable').append('<div>'+address+'</div>');
//     			jQuery('#timetable').append(table.append(rows));
//     		}
//     	});
//     	delete jHtml;
//     }
// }]);

