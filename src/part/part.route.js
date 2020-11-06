// part.route.js
import * as express from 'express';
import { getAllParts, getPart, editPart, addPart } from './part.controller';
import { isAuthenticated } from '../auth/auth';

const router = express.Router();

// PREFIX: /parts
router.get('/', isAuthenticated, getAllParts);
router.get('/:id', isAuthenticated, getPart);
router.put('/:id', isAuthenticated, editPart);
router.post('/:id', isAuthenticated, addPart);


export default router;