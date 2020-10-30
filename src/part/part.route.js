// part.route.js
import * as express from 'express';
import { getAllParts, getPart, editPart } from './part.controller';

const router = express.Router();

// PREFIX: /parts

router.get('/', getAllParts);
router.get('/:id', getPart);
router.put('/:id', editPart);

export default router;