var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var session = require('express-session');
var RedisStore  = require ('connect-redis')(session);
var domain = require('express-domain-middleware');
var validator = require('validator');
var colors = require('colors');
colors.setTheme({error: 'red'});

/* config */
/*var config = require('./config/config');*/

/* util */
var loginCheck = require('./util/loginCheck');

/* routes */
/*var login = require('./routes/login');
var sign = require('./routes/signUp');*/

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(domain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/*app.use(session({
    store: new RedisStore({
        port: config.redis.port,
        host: config.redis.host,
        pass: config.redis.password,
        ttl: config.redis.ttl
    }),
    name : config.session.name,
    secret: config.session.secret,
    proxy: true,
    resave : false,
    saveUninitialized : true,
    cookie: {
        secure: false
    }
}));*/
app.use(express.static(path.join(__dirname, 'public')));

/* 일단 get으로 요청된 것들은 바로 index.html으로 보여준다. */
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/html/index.html');
});
/*

*/
/* 로그인이 필요한 부분을 체크 *//*

app.use('/api/member', loginCheck.check);

*/
/* URL *//*

app.use('/api/login', login);
app.use('/api/sign', sign);
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    throw err;
});

// catch all error handler
app.use(function errorHandler(err, req, res, next) {
    err.status = validator.isNull(err.status) ? 500 : err.status;
    console.log('error on request %d | %s | %s | %d'.red, process.domain.id, req.method, req.url, err.status);
    console.log(err.stack.red);
    err.message = err.status == 500 ? 'Something bad happened. :(' : err.message;
    res.status(err.status).send(err.message);
});
// error handlers


http.createServer(app).listen(3005, function(){
    console.log('Express server listening on port ' + 30000);
});

module.exports = app;
