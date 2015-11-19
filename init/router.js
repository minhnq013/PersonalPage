var express = require('express');
var router = express.Router();

// Static resource routing.
// Use public as route path to prevent from automatically hitting the hardrive everytime.
// TODO: Change the path later to make more sense and avoid conflict.
router.use('/public', express.static(HOME + '/public'));

// Template routing
router.get('/partial/:name', function(req, res){
	var name = req.params.name;
	res.sendFile(HOME+'/public/modules/'+name+'/'+name+'.html');
});

// Bus module route
router.use(require(HOME + '/routes/busStops.router'));

// If public, then the client was requesting a non-existing static resource.
// TODO: This will be changed to adapt with other potential errors.
router.use('/public', function(req, res){
	console.log(req.url, 'Unknown resource');
	res.statusCode = 404;
	res.end();
});

// The default route
router.use('/', function(req, res) {
	res.sendFile(HOME+'/public/index.html');
});

router.use(function(err, req, res) {
	// TODO: General error handler
});

module.exports = router;