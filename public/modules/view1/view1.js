'use strict';

angular.module(CONST.APP_PREFIX + 'view1', ['ngRoute', CONST.APP_PREFIX+'core', 'restangular'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: '/partial/view1',
            controller: ['$scope', 'Restangular', '$interval', View1Ctrl],
            controllerAs: 'ctrl'
        });

        function View1Ctrl($scope, Restangular, $interval) {
            var ctrl = this;
            ctrl.busStops = [];
            function getAllBusStops() {
                var promise = Restangular.all('busStops').getList();
                // This is kind of like future object
                ctrl.busStops = promise.$object;
                return promise;
            }

            getAllBusStops();
            var getBusStopsInterval = $interval(getAllBusStops, 10000);

            $scope.getAllBusStops = getAllBusStops;
        }
    }]);