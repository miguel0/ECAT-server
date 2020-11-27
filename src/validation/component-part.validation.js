import { body } from 'express-validator';
import { missingField, maxLength, invalidValue } from './error-messages';


export default [
    body('remark')
        .exists().withMessage(missingField('remark'))
        .if(value => value !== null)
        .isString().withMessage(invalidValue('remark'))
        .isLength({max: 100}).withMessage(maxLength('remark', 100)),
    body('localQty')
        .exists().withMessage(missingField('quantity'))
        .if(value => value !== null)
        .isInt({gt: 0}).withMessage(invalidValue('quantity'))

]