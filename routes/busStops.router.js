var express = require('express');
var busStopController = require(HOME+'/busStopsModule/busStops.controller');

// Get new router instance
var router = express.Router();

// On get bus stop call
router.get('/busStops/', function (req, res, next) {
    var stopIds = req.query.stopIds ? req.query.stopIds.split(',') : null;

    busStopController.getBusStops(stopIds)
    .then(function(busStops) {
        res.statusCode = 200;
        res.end(JSON.stringify(busStops));
    });
});

module.exports = router;