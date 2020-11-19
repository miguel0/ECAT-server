import express from 'express';
import perms from './group.permissions';
import { getGroup, editGroup } from './group.controller';
import { isAuthenticated } from '../auth/auth';
import validate from '../validation/component.validation';

const router = express.Router();

// PREFIX: /groups
router.get('/:id', isAuthenticated(perms.get), getGroup);
router.put('/:id', isAuthenticated(perms.edit), validate, editGroup);

export default router;