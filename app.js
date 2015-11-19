var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

// Global
GLOBAL._ = require('lodash');

// Global Constanst TODO: Find a better way to control namespace for loading module..
GLOBAL.HOME = __dirname;


var app = express();
// Config
//app.use(favicon(HOME + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Routing
app.use(require('./init/router'));

// Run server
app.listen(8989);
console.log('Server on 8989');
module.exports = app;
