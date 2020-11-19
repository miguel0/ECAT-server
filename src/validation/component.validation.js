import { body } from 'express-validator';

export default [
        body('name', "Atributo 'Nombre (en ingles)' excede el limite de caracteres").isLength({ max : 50 }),
        body('spName', "Atributo 'Nombre en español' excede el limite de caracteres").isLength({ max : 50 }),
        body('chName', "Atributo 'Nombre en chino' excede el limite de caracteres").isLength({ max : 80 }),
        body('otherName', "Atributo 'Otros nombres' excede el limite de caracteres").isLength({ max : 50 })
    ]   
