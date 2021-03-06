var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var proxy = require('http-proxy-middleware');
// var bodyParser = require('body-parser');

var index = require('./routes/index');
var tutorial = require('./routes/tutorial');
var code = require('./routes/code');
var discuss = require('./routes/discuss');
var teach = require('./routes/teach');
var user = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/tutorial', tutorial);
app.use('/code', code);
app.use('/discuss', discuss);
app.use('/teach', teach);
app.use('/user', user);
app.use('/api/*', proxy({
    target: 'http://codeit.cc',
    changeOrigin: true
}));
app.use('/code-api/*', proxy({
    target: 'http://api.hackerrank.com',
    changeOrigin: true,
    pathRewrite: {'^/code-api/run': '/checker/submission.json'}
}));
app.use('/teach-api/*', proxy({
    target: 'http://panjian.xyz:3000',
    changeOrigin: true,
    pathRewrite: {
        '^/teach-api/roomlist': '/gists/roomlist',
        '^/teach-api/new': '/gists/new',
        '^/teach-api/room': '/gists/room'
    }
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
