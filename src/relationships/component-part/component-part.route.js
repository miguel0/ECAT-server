import express from 'express';
import perms from './component-part-permission';
import { deleteComponentPart, editComponentPart, getComponentPart } from './component-part.controller';
import { isAuthenticated } from '../../auth/auth';
import validate from '../../validation/component-part.validation';

const router = express.Router();

// PREFIX: /component-parts
router.delete('/:id', isAuthenticated(perms.delete), deleteComponentPart);
router.put('/:id', isAuthenticated(perms.edit), validate, editComponentPart);
router.get('/:id', isAuthenticated(perms.get), getComponentPart);

export default router;