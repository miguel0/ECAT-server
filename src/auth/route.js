const express = require('express');
const router = express.Router();
//const controller = require('./authController');
const admin = require('./auth.js');

router.get('/', async function(req, res, next) {
    const user = await admin.auth().createUser({
        email: 'viczaz99@hotmail.com',
        password: 'Jojos#00'
      });
  
      return res.send(user);
});

module.exports = router;