var express = require('express');
var router = express.Router();
var HOME = GLOBAL.CONSTANTS.PATH.HOME;

router.get('/partial/:name', function(req, res){
	var name = req.params.name;
	res.sendFile(HOME+'/public/partials/'+name+'/'+name+'.html');
});

router.use('/getBusArrival', require('./buses'));


/* GET home page. */
router.use('/', function(req, res) {
	res.sendFile(HOME+'/public/index.html');
});

module.exports = router;
