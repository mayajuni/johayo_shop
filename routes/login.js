/**
 * Created by 동준 on 2014-10-24.
 */
var express = require('express');
var cryptoUtil = require('../util/cryptoUtil');
var config = require('../config/config');
var validator = require('validator');
var error = require('../util/error');
var mongo = require('../config/mongoConfig');
/* mongo 연결 */
var mongoose = mongo.mongoose;
var Member = mongoose.model('member', mongo.schema.member);
/* 라우터 */
var router = express.Router();

/**
 * 로그인정보를 가지고 온다.
 */
router.post('/info', function(req, res){
    res.send(req.session.loginInfo);
});

/**
 * 로그인 하기
 */
router.post('/', function(req, res){
    var id = validator.isNull(req.param('email')) || !validator.isEmail(req.param('email'))  ? error.throw(409,'Please check email.') : req.param('email');
    var password = validator.isNull(req.param('pw')) ? error.throw(409,'Please check Password.') : cryptoUtil.encrypt(req.param('pw'), config.crypto.password);

    Member.findOne({_id: id, password : password}, function(err, loginInfo){
        if(err){
            throw err;
        }

        req.session.loginInfo = loginInfo;

        res.send(loginInfo);
    });
});

router.post('', function(req, res){

});

module.exports = router;