/**
 * Created by Administrator on 2014-07-09.
 */
var express = require('express');
var cryptoUtil = require('../util/cryptoUtil');
var config = require('../config/config');
var validator = require('validator');
var error = require('../util/error');
var dateUtil = require('../util/dateUtil');
/* mongo 연결 */
var mongo = require('../config/mongoConfig');
var mongoose = mongo.mongoose;
var Member = mongoose.model('member', mongo.schema.member);
/* 라우터 */
var router = express.Router();

/**
 * 이메일을 체크합니다
 * return : true 있다 / false 없다
 */
router.get('/:email', function(req, res) {
    Member.findOne({ _id: req.params.email }, function (err, userInfo) {
        if(err){
            throw err;
        }

        res.send(!!userInfo);
    });
});

/**
 * 회원가입 처리
 */
router.get('/', function(req, res) {
    var member = new Member();
    member._id = validator.isNull(req.param('email')) || !validator.isEmail(req.param('email'))  ? error.throw(409,'Please check email.') : req.param('email');
    member.password = validator.isNull(req.param('pw')) ? error.throw(409,'Please check Password.') : cryptoUtil.encrypt(req.param('pw'), config.crypto.password);
    member.firstName = validator.isNull(req.param('firstName')) ?  error.throw(409,'Please check First Name.') : req.param('firstName');
    member.lastName = validator.isNull(req.param('lastName')) ? error.throw(409,'Please check Last Name.') : req.param('lastName');
    member.regDt = dateUtil.nowDateTypeDate();

    member.save(function(err){
        if(err){
            throw err
        }
        res.send('');
    });
});

module.exports = router;