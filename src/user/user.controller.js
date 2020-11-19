import {getRepository} from 'typeorm';
import { User } from './user.entity';
import * as admin from 'firebase-admin';
import { validationResult } from 'express-validator';

export async function getAllUsers(req, res) {
    try {
        const repo = getRepository(User);
        const users = await repo.find();
        res.send(users);
    } catch(err) {
        res.send(err.message);
    }
}

export async function getUser(req, res) {
    try {
        let id = req.params.id;
        const repo = getRepository(User);
        const user = await repo.findOneOrFail(id);
        res.send(user);
    } catch(err) {
        res.send(err.message);
    }
}

export async function createUser(req, res) {
    try {

        const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
			
        }

        const {name, role, 
            tel, position, 
            area, email, password} = req.body;
        
        let firebaseUser = await admin.auth().createUser({
            email: email, 
            password: password
        });

        const repo = getRepository(User);

        let user = await repo.insert({
            id: firebaseUser.uid,
            name: name,
            role: role,
            tel: tel,
            position: position,
            area: area
        });

        // TODO: returned user from insert is not the same format as
        // if querying it with repo.find(). CHECK.
        user.email = email;

        res.send(user);
        

    } catch(err) {
        res.send(err.message);
        // TODO: any error (db or firebase) should drop created user
        // on either platform.
    }
}