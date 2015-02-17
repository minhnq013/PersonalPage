var express = require('express');
var router = express.Router();
var HOME = GLOBAL.CONSTANTS.PATH.HOME;
var cheerio = require('cheerio');
var http = require('http');

var BUS_URL = {
    49 : "http://pugetsound.onebusaway.org/where/standard/stop.action?id=1_13240&showArrivals=true"
};

router.get('/:numbers', function(req, res){
    var numbers = req.params.numbers.split(',');
    var results = {};
    

    numbers.forEach(function(number, index){

        http.get( BUS_URL[number] , 
        function(response) {
            var data = '';
            response.on('data', function(chunk){
                data += chunk;
            });
            response.on('end', function(){
                if (response.statusCode === 200) { // Finish
                    results[number] = parseHtml(data);
                }
            });
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });        
    });

    res.statusCode = 200;
    res.end(results);
});

router.get('*', function(req,res){
    console.log('haha');
});

function parseHtml(html){
    var $ = cheerio.load(html);
    // Get address title.
    var address = $('head title').text();
    var arrivalRows = $('table.arrivalsTable').find('.arrivalsRow');
    arrivalRows.forEach(function(row, index){
        console.log(row);
    });
}

module.exports = router;


