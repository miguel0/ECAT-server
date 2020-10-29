//part.controller.js
import {getRepository} from 'typeorm';
import { Part } from './part.entity';

export async function getAllParts(req, res) {
    const repo = getRepository(Part);
    const parts = await repo.find();
    res.send(parts);
}

export async function getPart(req, res) {
    try {
        let id = req.params.id;
        const repo = getRepository(Part);
        const part = await repo.findOneOrFail({id: id});
        res.send(part);
    } catch(err) {
        res.send(err.message);
    }
    
}