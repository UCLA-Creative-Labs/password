var express = require("express");
var router = express.Router();
const url = require('url');
const utils = require('../levels/utils')
router.get("/", function(req, res, next) {
    const params = url.parse(req.url,true).query;
    const level = utils.checkPassword(params.name, params.password);
    console.log(level)
    if (level)
        res.send({correct: true,nextLevel: level.nextLevel });
    else
        res.send({correct: false,nextLevel: null});
});

module.exports = router;