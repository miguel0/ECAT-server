import express from 'express';
import { getAllGroups } from './group.controller';

const router = express.Router();

router.get('/', getAllGroups);

export default router;