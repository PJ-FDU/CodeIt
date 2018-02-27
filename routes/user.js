var express = require('express');
var router = express.Router();

router.get('/login', function (req, res, next) {
  res.render('login', {title: 'CODEIT-登录'});
})

router.get('/register', function (req, res, next) {
    res.render('register', {title: 'CODEIT-注册'});
})

router.get('/profile', function (req, res, next) {
    res.render('profile', {title: 'CODEIT-个人资料'});
})

module.exports = router;
