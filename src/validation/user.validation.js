import { body, oneOf } from 'express-validator';

export default [
    body('name', 'error: name').exists().isString().isLength({ max : 50 }),
    oneOf([
        body('role', 'error: role').equals('A'),
        body('role', 'error: role').equals('C')
    ]),
    body('tel', 'error: tel').isMobilePhone().isLength({ max : 15}),
    body('position', 'error: position').isString().isLength({ max : 20 }),
    body('area', 'error: area').isString().isLength({ max : 20 }),
    body('email', 'error: email').exists().isEmail()

]

function errorMessage() {
    return ``
}