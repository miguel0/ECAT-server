import { body, param, oneOf } from 'express-validator';
import { missingField, invalidValue, maxLength } from './error-messages';

export default [
    param('id')
        .exists().withMessage(missingField('ID de vehículo'))
        .notEmpty().withMessage(missingField('ID de vehículo'))
        .isString().withMessage(invalidValue('ID de vehículo'))
        .isLength({ max : 100 }).withMessage("Atributo 'ID de vehículo' excede el limite de caracteres"),
    body('name')
        .exists().withMessage(missingField('nombre (en ingles)'))
        .if(value => value !== null)
        .isLength({ max : 100 }).withMessage("Atributo 'Nombre (en ingles)' excede el limite de caracteres"),
    body('spName')
        .exists().withMessage(missingField('nombre en español'))
        .if(value => value !== null)
        .isLength({ max : 100 }).withMessage("Atributo 'Nombre en español' excede el limite de caracteres"),
    body('otherName')
        .exists().withMessage(missingField('otros nombres'))
        .if(value => value !== null)
        .isLength({ max : 100 }).withMessage("Atributo 'Otros nombres' excede el limite de caracteres"),
    body('model')
        .exists().withMessage(missingField('modelo'))
        .if(value => value !== null)
        .notEmpty().withMessage(invalidValue('modelo'))
        .isString().withMessage(invalidValue('modelo'))
        .isLength({ max : 10 }).withMessage("Atributo 'modelo' excede el limite de caracteres"),
    oneOf([
        body('type')
            .equals('MC DIESEL'),
        body('type')
            .equals('MT GAS')   
    ], 'Tipo faltante o inválido. Debe ser "MC DIESEL" o "MT GAS".'),
    oneOf([
        body('motorConfig')
            .equals('6x2'),
        body('motorConfig')
            .equals('6x4'),
        body('motorConfig')
            .equals('6x6'),
        body('motorConfig')
            .equals('8x4')
    ], 'Configuración de motor faltante o inválida. Opciones (6x2, 6x4, 6x6, 8x4).'),
    oneOf([
        body('motorPower')
            .custom(value => value === 240),
        body('motorPower')
            .custom(value => value === 280),
        body('motorPower')
            .custom(value => value === 330),
        body('motorPower')
            .custom(value => value === 410),
        body('motorPower')
            .custom(value => value === 430),
        body('motorPower')
            .custom(value => value === 540),
    ], 'Potencia de motor faltante o inválida. Opciones (240, 280, 330, 410, 430, 540)'),
    oneOf([
        body('transmission')
            .equals('AL'),
        body('transmission')
            .equals('HW'),
        body('transmission')
            .equals('ZF')    
    ], 'Transmisión faltante o inválida. Debe ser "AL", "HW" o "ZF".'),
    body('imageURL')
        .exists().withMessage(missingField('URL de imagen'))
        .if(value => (value !== null && value !== ''))
        .isString().withMessage(invalidValue('URL de imagen'))
        .isLength({max: 200}).withMessage(maxLength('URL de imagen', 200))
        .isURL().withMessage(invalidValue('URL de imagen'))
    
    ]  