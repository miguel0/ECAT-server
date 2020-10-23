import express from 'express';
import { getVehicle } from './vehicle.controller';

const router =  express.Router();

router.get('/:id', getVehicle);

export default router;