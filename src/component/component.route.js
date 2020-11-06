import express from 'express';
import { isAuthenticated } from '../auth/auth';
import { getAllComponents, getComponent, editComponent } from './component.controller';

const router = express.Router();

router.get('/', isAuthenticated, getAllComponents);
router.get('/:id', isAuthenticated, getComponent);
router.put('/:id', isAuthenticated, editComponent);

export default router;