var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('teach', {title: 'CODEIT-一对一'});
});

router.get('/share-editor', function(req, res, next) {
    res.render('teach-editor', {title: 'CODEIT-一对一交流'});
});

module.exports = router;