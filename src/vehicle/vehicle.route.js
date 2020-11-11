import express from 'express';
import { getVehicle, getAllVehicles, editVehicle } from './vehicle.controller';
import { isAuthenticated } from '../auth/auth';

const router =  express.Router();

router.get('/:id', getVehicle);
router.get('/', getAllVehicles);
router.put('/:id', editVehicle);

export default router;