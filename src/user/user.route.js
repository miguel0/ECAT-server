import express from 'express';
import { getRepository } from 'typeorm';
import { User } from './user.entity';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const repo = getRepository(User);
        const users = await repo.find();
        res.send(users);
    } catch(err) {
        res.send(err.message);
    }
    
})

export default router;