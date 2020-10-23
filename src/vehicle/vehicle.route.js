import express from 'express';
import { getVehicle, getAllVehicles } from './vehicle.controller';

const router =  express.Router();

router.get('/:id', getVehicle);
router.get('/', getAllVehicles);

export default router;