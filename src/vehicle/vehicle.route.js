import express from 'express';
import perms from './vehicle.permissions';
import { getVehicle, getAllVehicles, addVehicle, editVehicle } from './vehicle.controller';
import { isAuthenticated } from '../auth/auth';
import validate from '../validation/vehicle.validation';

const router =  express.Router();

router.get('/:id', isAuthenticated(perms.get), getVehicle);
router.get('/', isAuthenticated(perms.getAll), getAllVehicles);
router.post('/:id', isAuthenticated(perms.add), addVehicle);
router.put('/:id', isAuthenticated(perms.edit), validate, editVehicle);

export default router;