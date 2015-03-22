var express = require('express');
var router = express.Router();

router.get('/partial/:name', function(req, res){
	var name = req.params.name;
	res.sendFile(FILE_DIRS.HOME+'/public/partials/'+name+'/'+name+'.html');
});

// BUs module
router.use('/bus', require(FILE_DIRS.CONTROLLERS+'/bus'));

/* GET home page. */
router.use('/', function(req, res) {
	res.sendFile(FILE_DIRS.HOME+'/public/index.html');
});

module.exports = router;