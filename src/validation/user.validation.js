import { body, oneOf } from 'express-validator';
import { invalidValue, maxLength, missingField } from './error-messages';

const common = {
    name: "nombre",
    role: "rol",
    tel: "teléfono",
    position: "puesto",
    area: "área",
    email: "email"
}

export default [
    body('name')
        .exists().withMessage(missingField(common['name']))
        .isString().withMessage(invalidValue(common['name']))
        .notEmpty().withMessage(invalidValue(common['name']))
        .isLength({ max : 50 }).withMessage(maxLength(common['name'], 50)),
    oneOf([
        body('role')
            .equals('A'),
        body('role')
            .equals('C')
    ], invalidRole()),
    body('tel')
        .exists().withMessage(missingField(common['tel']))
        .if(value => value !== null)
        .isMobilePhone().withMessage(invalidPhone())
        .isLength({ max : 15}).withMessage(maxLength(common['tel'], 15)),
    body('position')
        .exists().withMessage(missingField(common['position']))
        .if(value => value !== null)
        .isString().withMessage(invalidValue(common['position']))
        .isLength({ max : 20 }).withMessage(maxLength(common['position'], 20)),
    body('area')
        .exists().withMessage(missingField(common['area']))
        .if(value => value !== null)
        .isString().withMessage(invalidValue(common['area']))
        .isLength({ max : 20 }).withMessage(maxLength(common['area'], 20)),
    body('email')
        .exists().withMessage(missingField(common['email']))
        .isEmail().withMessage(invalidEmail())
]

function invalidPhone() {
    return 'Número telefónico ingresado no es válido.';
}

function invalidEmail() {
    return 'Email ingresado no es válido.';
}

function invalidRole() {
    return 'Rol faltante o inválido.';
}