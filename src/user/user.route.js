import express from 'express';
import { isAuthenticated } from '../auth/auth';
import perms from './user.permissions'; 
import { getAllUsers, addUser, getUser, editUser, deleteUser } from './user.controller';
import validate from '../validation/user.validation';

const router = express.Router();

router.post('/', isAuthenticated(perms.add), validate, addUser);
router.get('/', isAuthenticated(perms.getAll), getAllUsers);
router.get('/:id', isAuthenticated(perms.get), getUser);
router.put('/:id', isAuthenticated(perms.edit), editUser);
router.delete('/:id', isAuthenticated(perms.delete), deleteUser);

export default router;