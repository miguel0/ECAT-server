import express from 'express';
import { getGroup } from './group.controller';

const router = express.Router();

router.get('/:id', getGroup);

export default router;