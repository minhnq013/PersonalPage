'use strict';

// Declare app level module which depends on views, and components
var CONST = {};
CONST.APP_NAME = 'myApp';
CONST.APP_PREFIX = CONST.APP_NAME + '.';

angular.module(CONST.APP_NAME, [
    'ngRoute',
    CONST.APP_PREFIX + 'view1',
    CONST.APP_PREFIX + 'view2',
    CONST.APP_PREFIX + 'rest'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/view1'});
}]);