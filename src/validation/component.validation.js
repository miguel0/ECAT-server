import { body } from 'express-validator';
import { missingField } from './error-messages'; 

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
        .isLength({ max : 50 }).withMessage("Atributo 'Otros nombres' excede el limite de caracteres")
    ]  