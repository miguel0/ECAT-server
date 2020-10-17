// part.route.js

const express = require('express');
const router = express.Router();
const {test, getAllFighters} = require('./part.controller');

// PREFIX: /parts

router.get('/', test);
router.get('/many', getAllFighters);

module.exports = router;