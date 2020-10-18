import express from 'express';
import { createUser } from './auth.controller';
const router = express.Router();

router.post('/user', createUser);

export default router;