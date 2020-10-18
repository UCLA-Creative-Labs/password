var express = require("express");
var router = express.Router();
const url = require('url');
const utils = require('../levels/utils')
router.get("/", function(req, res, next) {
    const params = url.parse(req.url,true).query;
    const nextLevel = utils.checkPassword(params.name, params.password);
    if (nextLevel)
        res.send({correct: true,nextLevel: nextLevel });
    else
        res.send({correct: false,nextLevel: nextLevel });
});

module.exports = router;