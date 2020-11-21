import express from 'express';
import perms from './component-part-permission';
import { deleteComponentPart } from './component-part.controller';
import { isAuthenticated } from '../../auth/auth';

const router = express.Router();

// PREFIX: /component-parts
router.delete('/:id', isAuthenticated(perms.delete), deleteComponentPart);

export default router;