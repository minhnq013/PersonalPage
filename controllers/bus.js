var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var http = require('http');
var Promise = require('bluebird');    // Promise

var STOP_ARRIVAL_URL = {
    '13210' : "http://pugetsound.onebusaway.org/where/standard/stop.action?id=1_13210",
    '29273' : 'http://pugetsound.onebusaway.org/where/standard/stop.action?id=1_29273',
    '13240' : 'http://pugetsound.onebusaway.org/where/standard/stop.action?id=1_13240'
};

router.get('/',function(req, res) {
    var stopIds = req.query.stopIds.split(',');

    var promises = [];
    stopIds.forEach(function(id, index) {
        promises.push(getSchedule(id));   
    });
    Promise.all(promises).then(function(schedules) {
        res.statusCode = 200;
        res.end(JSON.stringify(schedules.reduce(function(prev, next){
                            return prev.concat(next);
                        }))
        );
    });  
});


function getSchedule(stopId, callback) {
    return new Promise(function(resolve, reject) {
        http.get(STOP_ARRIVAL_URL[stopId], 
            function(response) {
                var data = '';
                var schedule = null;
                response.on('data', function(chunk) {
                    data += chunk;
                });
                response.on('end', function() {
                    if (response.statusCode === 200) { // Finish
                        var schedules = parseHtml(data);
                        resolve(schedules);
                    }
                });
            }
        ).on('error', function(e) {
            if(reject instanceof Function) reject(e);
            else onError(e);
        });
    });
}

function onError(e){
    console.log(e);
}

function parseHtml(html) {
    var schedules = [];
    var $ = cheerio.load(html);
    // Get address title.
    var address = $('head title').text();
    var arrivalRows = $('table.arrivalsTable').find('.arrivalsRow');
    arrivalRows.each(function(index, row) {
        schedules.push({
            'busNumber' : $(row).find($('.arrivalsRouteEntry')).text(),
            'arriveDescription' : $(row).find($('.arrivalsDescriptionEntry')).text(),
            'arriveStatus' : $(row).find($('.arrivalsStatusEntry')).text()
        });
    });
    return schedules;
}

module.exports = router;



