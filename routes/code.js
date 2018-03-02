var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('code', {title: 'CODEIT-代码'});
});

router.get('/detail', function(req, res, next) {
    res.render('detail-editor', {title: 'CODEIT-代码详情'});
});

router.get('/editor', function(req, res, next) {
    res.render('new-editor', {title: 'CODEIT-新建代码'});
});

module.exports = router;
