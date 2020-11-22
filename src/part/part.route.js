// part.route.js
import * as express from 'express';
import {getAllParts, getPart, editPart, addPart} from './part.controller';
import { isAuthenticated } from '../auth/auth';
import perms from './part.permissions';
import validate from '../validation/part.validation';

const router = express.Router();

// PREFIX: /parts
router.get('/', isAuthenticated(perms.getAll), getAllParts);
router.get('/:id', isAuthenticated(perms.get), getPart);
router.put('/:id', isAuthenticated(perms.edit), validate, editPart);
router.post('/:id', isAuthenticated(perms.add), validate, addPart);

export default router;