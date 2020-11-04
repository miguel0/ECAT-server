import express from 'express';
import { getAllComponents, getComponent } from './component.controller';
import { isAuthenticated } from '../auth/auth';

const router = express.Router();

router.get('/', isAuthenticated, getAllComponents);
router.get('/:id', isAuthenticated, getComponent);

export default router;