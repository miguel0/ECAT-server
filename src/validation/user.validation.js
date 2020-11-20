import { body, oneOf } from 'express-validator';

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
        .exists().withMessage(missingField('name'))
        .isString().withMessage(invalidValue('name'))
        .isLength({ max : 50 }).withMessage(maxLength('name', 50)),
    oneOf([
        body('role')
            .equals('A'),
        body('role')
            .equals('C')
    ], invalidRole()),
    body('tel')
        .isMobilePhone().withMessage(invalidPhone())
        .isLength({ max : 15}).withMessage(maxLength('tel', 15)),
    body('position')
        .isString().withMessage(invalidValue('position'))
        .isLength({ max : 20 }).withMessage(maxLength('position', 20)),
    body('area')
        .isString().withMessage(invalidValue('area'))
        .isLength({ max : 20 }).withMessage(maxLength('area', 20)),
    body('email')
        .exists().withMessage(missingField('email'))
        .isEmail().withMessage(invalidEmail())
]

function missingField(key) {
    return `Campo faltante: '${common[key]}'`;
}

function invalidValue(key) {
    return `Valor inválido para campo: '${common[key]}'`;
}

function invalidPhone() {
    return 'Número telefónico ingresado no es válido.';
}

function invalidEmail() {
    return 'Email ingresado no es válido.';
}

function maxLength(key, length) {
    return `Longitud inválida para '${common[key]}' (máximo ${length} caracteres)`;
}

function invalidRole() {
    return 'Rol faltante o inválido.';
}