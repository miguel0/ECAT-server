import express from 'express';
import { getAllComponents } from './component.controller';
const router = express.Router();

router.get('/', getAllComponents);

export default router;