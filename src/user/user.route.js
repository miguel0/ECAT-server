import express from 'express';
import { isAuthenticated } from '../auth/auth';
import perms from './user.permissions'; 
import { getAllUsers, createUser, getUser } from './user.controller';

const router = express.Router();

router.post('/', isAuthenticated(perms.add), createUser);
router.get('/', isAuthenticated(perms.getAll), getAllUsers);
router.get('/:id', isAuthenticated(perms.get), getUser);

export default router;