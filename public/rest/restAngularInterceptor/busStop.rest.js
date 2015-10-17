/**
 * Created by Minh on 10/16/2015.
 */
angular.module(CONST.APP_PREFIX + 'rest').factory('busStopsInterceptor', function() {
    var object = {};

    /**
     * The interception
     * @param data
     * @param operation
     * @returns {*}
     */
    function intercept(data, operation) {
        switch (operation) {
            case 'getList':
                return _.map(data, translateBusStopsDataStructure);

            default: return;
        }
    }
    object.intercept = intercept;

    /**
     * Translate the data structure (property name) of busStop
     * @param busStop
     * @returns {{id: *, address: *, schedules: *}}
     */
    function translateBusStopsDataStructure(busStop) {
        var translatedSchedules = _.map(busStop.schedules, function(schedule) {
            return {
                'busNumber': schedule.busNumber,
                'arrivalTime': schedule.arrivalTime,
                'arrivalStatus': schedule.arrivalStatus,
                'busDestination': schedule.busDestination,
            };
        });

        var output = {
            id: busStop.id,
            address: busStop.address,
            schedules: translatedSchedules
        }
        return output;
    }

    return object;
})