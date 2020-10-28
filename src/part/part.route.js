// part.route.js
import * as express from 'express';
import { getAllParts, getPart } from './part.controller';

const router = express.Router();

// PREFIX: /parts

router.get('/', getAllParts);
router.get('/:id', getPart);

export default router;