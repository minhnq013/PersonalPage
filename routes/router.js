var express = require('express');
var router = express.Router();

// Static resource routing.
// Use public as route path to prevent from automatically hitting the hardrive everytime.
router.use('/public', express.static(FILE_DIRS.HOME + '/public'));

// Template routing
router.get('/partial/:name', function(req, res){
	var name = req.params.name;
	res.sendFile(FILE_DIRS.HOME+'/public/modules/'+name+'/'+name+'.html');
});

// Bus module route
router.use(require(FILE_DIRS.CONTROLLERS+'/busStops.controller'));

// If public, then the client was requesting a non-existing static resource.
router.use('/public', function(req, res){
	console.log(req.url, 'Unknown resource');
	res.statusCode = 404;
	res.end();
});

/* GET home page. */
router.use('/', function(req, res) {
	res.sendFile(FILE_DIRS.HOME+'/public/index.html');
});

module.exports = router;