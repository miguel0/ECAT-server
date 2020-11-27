import { body } from 'express-validator';
import { missingField, invalidValue, maxLength } from './error-messages'; 

export default [
    body('name')
        .exists().withMessage(missingField('nombre (en ingles)'))
        .if(value => value !== null)
        .isLength({ max : 50 }).withMessage("Atributo 'Nombre (en ingles)' excede el limite de caracteres"),
    body('spName')
        .exists().withMessage(missingField('nombre en español'))
        .if(value => value !== null)
        .isLength({ max : 50 }).withMessage("Atributo 'Nombre en español' excede el limite de caracteres"),
    body('chName')
        .exists().withMessage(missingField('nombre en chino'))
        .if(value => value !== null)
        .isLength({ max : 80 }).withMessage("Atributo 'Nombre en chino' excede el limite de caracteres"),
    body('otherName')
        .exists().withMessage(missingField('otros nombres'))
        .if(value => value !== null)
        .isLength({ max : 50 }).withMessage("Atributo 'Otros nombres' excede el limite de caracteres"),
    body('imageURL')
        .exists().withMessage(missingField('URL de imagen'))
        .if(value => (value !== null && value !== ''))
        .isString().withMessage(invalidValue('URL de imagen'))
        .isLength({max: 200}).withMessage(maxLength('URL de imagen', 200))
        .isURL().withMessage(invalidValue('URL de imagen'))
    ]  