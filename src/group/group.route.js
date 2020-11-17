import express from 'express';
import { getGroup } from './group.controller';
import { isAuthenticated } from '../auth/auth';

const router = express.Router();

router.get('/:id', getGroup);

export default router;