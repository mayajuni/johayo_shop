/**
 * Created by 동준 on 2014-10-30.
 */
var express = require('express');
var error = require('../util/error');
var dateUtil = require('../util/dateUtil');
/*  캐쉬 설정 */
var LRU = require("lru-cache") , options = { max: 500
        , length: function (n) { return n * 2 }
        , dispose: function (key, n) { n.close() }
        , maxAge: 1000 * 60 * 60 }
    , cache = LRU(options);

/* mongo 연결 */
var mongo = require('../config/mongoConfig');
var mongoose = mongo.mongoose;
var Member = mongoose.model('menu', mongo.schema.menu);
/* 라우터 */
var router = express.Router();

/* 메뉴 가지고 오기 */
router.get('/', function(req, res){

});

module.exports = router;