const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.end('You got a component!!!');
});

module.exports = router;