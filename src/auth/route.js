const express = require('express');
const router = express.Router();
const auth = require('./auth');

router.post('/user', async function(req, res) {
  auth.createUser(req, res);
});

module.exports = router;