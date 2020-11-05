import express from 'express';
import { getAllComponents, getComponent } from './component.controller';
const router = express.Router();

router.get('/', getAllComponents);
router.get('/:id', getComponent);
router.put('/:id', editComponent);

export default router;