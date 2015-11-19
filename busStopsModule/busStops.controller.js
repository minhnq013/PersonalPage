var cheerio = require('cheerio');
var http = require('http');
var Promise = require('bluebird');

// TODO: Store this in DB later
var STOP_ARRIVAL_URL = {
    '13210': 'http://pugetsound.onebusaway.org/where/standard/stop.action?id=1_13210',
    '29273': 'http://pugetsound.onebusaway.org/where/standard/stop.action?id=1_29273',
    '13240': 'http://pugetsound.onebusaway.org/where/standard/stop.action?id=1_13240'
};

var exports = {};

/**
 * Exposed method for getting bus stop detail info.
 * @param ids {Array}
 * @return Promise
 */
function getBusStops(ids) {
    // If no stop ids provided, return all bus stop
    var stopIds = (_.isArray(ids) && ids.length) ? ids : Object.keys(STOP_ARRIVAL_URL);

    // Multiple promise
    var promises = [];
    stopIds.forEach(function (id) {
        promises.push(getBusStop(id));
    });
    // Compact remove null item from resulted array.
    var chain = Promise.all(promises).then(_.compact);

    return chain;
}
exports.getBusStops = getBusStops;

/**
 * Send the http request to get the html page of bus stop. Parse it and return data
 * @param stopId {string}
 * @returns {bluebird|exports|module.exports}
 */
function getBusStop(stopId) {
    return new Promise(function (resolve, reject) {
        // In case id not exist
        if (!STOP_ARRIVAL_URL.hasOwnProperty(stopId)) {
            resolve(null);
            return;
        }

        http.get(STOP_ARRIVAL_URL[stopId],
            function (response) {
                var data = '';
                response.on('data', function (chunk) {
                    data += chunk;
                });
                response.on('end', function () {
                    if (response.statusCode === 200) { // Finish
                        var stop = {
                            'id': stopId,
                            'address': parseStopAddressFromHtml(data),
                            'schedules': parseSchedulesFromHtml(data)
                        }
                        resolve(stop);
                    }
                });
            }
        ).on('error', function (e) {
            onError(e);
        });
    });
}

/**
 * Handle error
 * @param e {Object}
 */
function onError(e) {
    console.log(e);
}

/**
 * Parse the bus stop address from the html.
 * @param html {string}
 * @returns {string}
 */
function parseStopAddressFromHtml(html) {
    var $ = cheerio.load(html);
    var address = $('.arrivalsStopAddress').text();
    return address;
}

/**
 * Parse and extract the bus schedules from html.
 * @param html {string}
 * @returns {Array}
 */
function parseSchedulesFromHtml(html) {
    var schedules = [];
    var $ = cheerio.load(html);
    var $arrivalRows = $('table.arrivalsTable').find('.arrivalsRow');
    $arrivalRows.each(function (index, row) {
        var $row = $(row);
        schedules.push({
            busNumber: $row.find('.arrivalsRouteEntry').text(),
            busDestination: $row.find('.arrivalsDestinationEntry').text(),
            arrivalTime: $row.find('.arrivalsTimeEntry').text(),
            arrivalStatus: $row.find('.arrivalsStatusEntry').text()
        });
    });
    return schedules;
}

module.exports = exports;




