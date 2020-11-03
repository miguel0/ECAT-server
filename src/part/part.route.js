// part.route.js
import * as express from 'express';
import { getAllParts, getPart, editPart, addPart } from './part.controller';

const router = express.Router();

// PREFIX: /parts

router.get('/', getAllParts);
router.get('/:id', getPart);
router.put('/:id', editPart);
router.post('/:id', addPart);

export default router;