var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index');
});

router.get('/view/:name', function(req, res){
	var name = req.params.name;
	res.render(name+'/'+name);
});

router.get('*',function(req, res){
	res.redirect('/');
});

module.exports = router;
