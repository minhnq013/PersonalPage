var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

// Constanst
GLOBAL.CONSTANTS = {
	PATH: {
		HOME: __dirname
	},
};

var app = express();

// view engine setup
// app.engine('.html', require('jade'));
// app.set('views', path.join(__dirname, 'public'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


var router = require('./routes/router');

// In order to disable auto-serving the index.html.
// Place the static content register after routing.
// This also prevent hitting hard drive frequently. Avoid bottle neck performance.
app.use(router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/getBusArrival', function(req, res){
    http.get("http://pugetsound.onebusaway.org/where/standard/stop.action?id=1_13240&showArrivals=true", 
    function(response) {
        var data = '';
        response.on('data', function(chunk){
            data += chunk;
        });
        response.on('end', function(){
            if (response.statusCode === 200) { // Finish
                res.statusCode = 200;
                res.write(data);
                res.end();
            }
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// } else {
//     // production error handler
//     // no stacktraces leaked to user
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: {}
//         });
//     });
// }



app.listen(8989);
console.log('Server on 8989');
module.exports = app;
