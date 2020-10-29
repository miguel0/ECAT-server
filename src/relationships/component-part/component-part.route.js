import express from 'express';
import { deleteComponentPart } from './component-part.controller';
const router = express.Router();

router.get('/:id', deleteComponentPart);

export default router;