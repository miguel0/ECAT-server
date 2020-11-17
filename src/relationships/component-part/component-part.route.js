import express from 'express';
import { deleteComponentPart } from './component-part.controller';
import { isAuthenticated } from '../../auth/auth';

const router = express.Router();

// PREFIX: /component-parts

router.delete('/:id', deleteComponentPart);

export default router;