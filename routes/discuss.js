var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('discuss', {title: 'CODEIT-论坛'});
});

router.get('/new', function (req, res, next) {
    res.render('discuss-new', {title: 'CODEIT-新建帖子'});
});

router.get('/detail', function (req, res, next) {
    res.render('discuss-detail', {title: 'CODEIT-帖子详情'});
});

module.exports = router;
