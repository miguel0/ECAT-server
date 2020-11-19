import { body, param } from 'express-validator';

export default [
   param('id', 'error: id').exists().isString().isLength({ max : 20 })
      .custom((value, {req}) => {
         return value !== req.body.replaceNo;

      }),
   body('replaceNo', 'error: replaceNo').isString().isLength({ max : 20 }),
   body('name', 'error: name').isString().isLength({ max : 50 }),
   body('chName', 'error: chName').isString().isLength({ max : 80 }),
   body('spName', 'error: spName').isString().isLength({ max : 50 }),
   body('otherName', 'error: otherName').isString().isLength({ max : 50 }),


]