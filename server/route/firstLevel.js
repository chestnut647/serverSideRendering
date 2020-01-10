var express = require('express');
const { render } = require('../common/util');

var router = express.Router();

router.get('/secondlevel1', function(req, res, next) {
    render(res, 'firstLevel/secondLevel1', {
        title: 'fist-send1'
    });
})

router.get('/secondlevel2', function(req, res, next) {
    render(res, 'firstLevel/secondLevel2', {
        title: 'fist-send2'
    });
})


module.exports = router;
