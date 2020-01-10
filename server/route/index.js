const express = require('express');
const { render } = require('../common/util');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.end('i am ok');
})

router.get('/test1', function(req, res, next) {

    render(res, 'test1', {
        title: 'test1'
    });
})

router.get('/test2', function(req, res, next) {
    render(res, 'test2', {
        title: 'test2'
    });
})

module.exports = router;
