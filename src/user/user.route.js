import express from 'express';
import { Http2ServerRequest } from 'http2';
import { getRepository } from 'typeorm';
import { User } from './user.entity';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        //return res.status(400).json({message: "Something happened..."});
        const repo = getRepository(User);
        const users = await repo.find();
        res.send(users);
    } catch(err) {
        console.log("error here!!");
        res.send(err.message);
    }
    
});

router.post('/', async (req, res) => {
    try {
        let bodyUser = req.body.user;
        const repo = getRepository(User);

        const newUser = repo.create(bodyUser);

        let savedUser = await repo.save(newUser);

        res.send(savedUser);
        

    } catch(err) {
        res.send(err.message);
    }
});

export default router;