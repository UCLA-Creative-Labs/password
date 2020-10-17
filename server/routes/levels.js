var express = require("express");
var router = express.Router();
const url = require('url');
const utils = require('../levels/utils')
router.get("/", function(req, res, next) {
    const params = url.parse(req.url,true).query;
    if (utils.checkPassword(params.name, params.password))
        res.send("Congrats");
    else
        res.send("Nope");
});

module.exports = router;