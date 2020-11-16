import express from 'express';
import perms from './component.permission';
import { isAuthenticated } from '../auth/auth';
import { getAllComponents, getComponent, editComponent } from './component.controller';

const router = express.Router();

router.get('/', isAuthenticated(perms.getAll), getAllComponents);
router.get('/:id', isAuthenticated(perms.get), getComponent);
router.put('/:id', isAuthenticated(perms.edit), editComponent);

export default router;