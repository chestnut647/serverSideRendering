var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.end('i am ok');
})

router.get('/test1', function(req, res, next) {
    res.end('i am test1');
})

router.get('/test2', function(req, res, next) {
    res.end('i am test2');
})

