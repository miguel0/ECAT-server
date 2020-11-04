import express from 'express';
import { getGroup } from './group.controller';
import { isAuthenticated } from '../auth/auth';

const router = express.Router();

router.get('/:id', isAuthenticated, getGroup);

export default router;