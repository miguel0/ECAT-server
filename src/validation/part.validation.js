const { body } = require('express-validator/check');

exports.validate = (method) => {

     return [ 
        body('replaceNo', "userName doesn't exists").exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('phone').optional().isInt(),
        body('status').optional().isIn(['enabled', 'disabled'])
       ]   
}