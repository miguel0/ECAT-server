import express from 'express';
import { getVehicle, getAllVehicles, editVehicle } from './vehicle.controller';
import { isAuthenticated } from '../auth/auth';

const router =  express.Router();

router.get('/:id', isAuthenticated, getVehicle);
router.get('/', isAuthenticated, getAllVehicles);
router.put('/:id', isAuthenticated, editVehicle);

export default router;