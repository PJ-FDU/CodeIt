var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('tutorial', {title: 'CODEIT-教程'});
});

router.get('/detail', function(req, res, next) {
    res.render('tutorial-detail', {title: 'CODEIT-教程详情'});
});

module.exports = router;
