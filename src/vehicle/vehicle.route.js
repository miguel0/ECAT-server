import express from 'express';
import { getVehicle, getAllVehicles } from './vehicle.controller';
import { isAuthenticated } from '../auth/auth';

const router =  express.Router();

router.get('/:id', isAuthenticated, getVehicle);
router.get('/', isAuthenticated, getAllVehicles);

export default router;