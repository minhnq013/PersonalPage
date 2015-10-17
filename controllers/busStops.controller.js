var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var http = require('http');
var Promise = require('bluebird');
var _ = require('lodash');

var STOP_ARRIVAL_URL = {
    '13210': "http://pugetsound.onebusaway.org/where/standard/stop.action?id=1_13210",
    '29273': 'http://pugetsound.onebusaway.org/where/standard/stop.action?id=1_29273',
    '13240': 'http://pugetsound.onebusaway.org/where/standard/stop.action?id=1_13240'
};

router.get('/busStops/', function (req, res) {
    // If no stop ids provided, return all bus stop
    var stopIds = _.isArray(req.query.stopIds) ? req.query.stopIds.split(',') : Object.keys(STOP_ARRIVAL_URL);

    var promises = [];
    stopIds.forEach(function (id) {
        promises.push(getBusStop(id));
    });

    Promise.all(promises).then(function (busStops) {
        res.statusCode = 200;
        res.end(JSON.stringify(busStops));
    });
});


/**
 * Send the http request to get the html page of bus stop. Parse it and return data
 * @param stopId
 * @returns {bluebird|exports|module.exports}
 */
function getBusStop(stopId) {
    return new Promise(function (resolve, reject) {

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
            if (reject instanceof Function) reject(e);
            else onError(e);
        });
    });
}

function onError(e) {
    console.log(e);
}

/**
 * Parse the bus stop address from the html.
 * @param html
 * @returns {string}
 */
function parseStopAddressFromHtml(html) {
    var $ = cheerio.load(html);
    var address = $('.arrivalsStopAddress').text();
    return address;
}

/**
 * Parse and extract the bus schedules from html.
 * @param html
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

module.exports = router;




