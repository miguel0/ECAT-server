//part.controller.js
import {getRepository} from 'typeorm';
import { Part } from './part.entity';

export async function getAllParts(req, res) {
    const repo = getRepository(Part);
    const parts = await repo.find();
    res.send(parts);
}

// using plain oracledb
/*export async function getSomething(req, res) {
    try {
        let connection = await oracle.getConnection();
        let users = await connection.execute('SELECT * FROM SONGS', [], {outFormat: oracle.OUT_FORMAT_OBJECT});
        console.log(users);
        res.send(users.rows);
    } catch(err) {
        res.send(err.message);
    }
}*/