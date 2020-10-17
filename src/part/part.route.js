// part.route.js

const express = require('express');
const router = express.Router();
const {test} = require('./part.controller');

// PREFIX: /parts

router.get('/', test);

module.exports = router;