/**
 * Created by Minh on 10/16/2015.
 */
angular.module(CONST.APP_PREFIX + 'rest', ['restangular'])
    .run(['Restangular', 'busStopsInterceptor', function (Restangular, busStopsInterceptor) {
        Restangular.addResponseInterceptor(function (data, operation, what, url, response, deferred) {
            switch (what) {
                // Intercept busStops
                case "busStops":
                    return busStopsInterceptor.intercept(data, operation);
            }
        });
    }]);