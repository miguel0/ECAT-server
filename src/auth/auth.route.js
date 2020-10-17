const express = require('express');
const router = express.Router();
const {createUser} = require('./auth.controller');

router.post('/user', createUser);

module.exports = router;