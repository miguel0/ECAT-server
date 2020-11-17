import express from 'express';
import { getVehicle, getAllVehicles, addVehicke, editVehicle } from './vehicle.controller';
import { isAuthenticated } from '../auth/auth';

const router =  express.Router();

router.get('/:id', isAuthenticated, getVehicle);
router.get('/', isAuthenticated, getAllVehicles);
router.post('/:id', isAuthenticated, addVehicle);
router.put('/:id', isAuthenticated, editVehicle);

export default router;