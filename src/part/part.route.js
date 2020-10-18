// part.route.js
import * as express from 'express';
import { getAllParts } from './part.controller';

const router = express.Router();

// PREFIX: /parts

router.get('/', getAllParts);

export default router;