var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

// Constanst
GLOBAL.FILE_DIRS = {
	HOME: __dirname,
    CONTROLLERS: __dirname + '/controllers',
    MODELS: __dirname + '/models'
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

// Router
app.use(router);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(8989);
console.log('Server on 8989');
module.exports = app;
