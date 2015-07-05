var express = require('express');
var router = express.Router();

// Static resource routing.
// Use public as route path to prevent from automatically hitting the hardrive everytime.
router.use('/public', express.static(FILE_DIRS.HOME + '/public'));

// Template routing
router.get('/partial/:name', function(req, res){
	var name = req.params.name;
	res.sendFile(FILE_DIRS.HOME+'/public/partials/'+name+'/'+name+'.html');
});

// BUs module
router.use('/bus', require(FILE_DIRS.CONTROLLERS+'/bus'));

// If public, then the client was request a non-existing static resource.
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