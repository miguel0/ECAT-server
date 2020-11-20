import {getRepository} from 'typeorm';
import { User } from './user.entity';
import * as admin from 'firebase-admin';

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
        let firebaseUser = await admin.auth().getUser(id);
        const repo = getRepository(User);
        const user = await repo.findOneOrFail(id);
        user.email = firebaseUser.email;
        res.send(user);
    } catch(err) {
        res.send(err.message);
    }
}

export async function addUser(req, res) {
    try {
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

        res.send(true);
        

    } catch(err) {
        res.send(err.message);
        // TODO: any error (db or firebase) should drop created user
        // on either platform.
    }
}

export async function editUser(req, res) {
    try {
        const id = req.params.id;
        const {name, role, tel, position, area, email} = req.body;

        let firebaseUser = await admin.auth().updateUser(id,{
            email: email
        });

        const repo = getRepository(User);

        let user = await repo.update(id,{
            name: name,
            role: role,
            tel: tel,
            position: position,
            area: area
        });

        // TODO: returned user from insert is not the same format as
        // if querying it with repo.find(). CHECK.

        res.send(true);
    } catch(err) {
        res.send(err.message);
    }
}

export async function deleteUser(req, res) {
    try {
        const id = req.params.id;

        await admin.auth().deleteUser(id);

        const repo = getRepository(User);

        let user = await repo.delete(id);

        // TODO: returned user from insert is not the same format as
        // if querying it with repo.find(). CHECK.

        res.send(true);
    } catch(err) {
        res.send(err.message);
    }
}