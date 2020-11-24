import { body, param } from 'express-validator';
import { invalidValue, maxLength, missingField } from './error-messages';

const common = {
   id: "número de parte",
   replaceNo: "número de reemplazo",
   name: "nombre",
   chName: "nombre en chino",
   spName: "nombre en español",
   otherName: "nombre alterno"
}

export default [
   param('id')
      .notEmpty().withMessage(missingField(common['id']))
      .exists().withMessage(missingField(common['id']))
      .isString().withMessage(invalidValue(common['id']))
      .isLength({ max : 20 }).withMessage(maxLength(common['id'], 20))
      .custom((value, {req}) => {
         return value !== req.body.replaceNo;

      }).withMessage(sameNumbers()),
   body('replaceNo')
      .if(value => value)
      .isString().withMessage(invalidValue(common['replaceNo']))
      .isLength({ max : 20 }).withMessage(maxLength(common['replaceNo'], 20)),
   body('name')
      .if(value => value)
      .isString().withMessage(invalidValue(common['name']))
      .isLength({ max : 50 }).withMessage(maxLength(common['name'], 50)),
   body('chName')
      .if(value => value)
      .isString().withMessage(invalidValue(common['chName']))
      .isLength({ max : 80 }).withMessage(maxLength(common['chName'], 80)),
   body('spName')
      .if(value => value)
      .isString().withMessage(invalidValue(common['spName']))
      .isLength({ max : 50 }).withMessage(maxLength(common['spName'], 50)),
   body('otherName')
      .if(value => value)
      .isString().withMessage(invalidValue(common['otherName']))
      .isLength({ max : 50 }).withMessage(maxLength(common['otherName'], 50)),
]

function sameNumbers() {
   return 'El número de parte y el número de remplazo deben ser distintos.';
}