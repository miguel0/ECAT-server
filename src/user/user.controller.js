import {getRepository} from 'typeorm';
import { User } from './user.entity';
import * as admin from 'firebase-admin';
import { validationResult } from 'express-validator';
import { BadBodyError, GeneralError } from '../exceptions/exceptions';

export async function getAllUsers(req, res, next) {
    try {
        const repo = getRepository(User);
        const users = await repo.find();
        return res.send(users);
    } catch(err) {
        next(err);
    }
}

export async function getUser(req, res, next) {
    try {
        let id = req.params.id;
        let firebaseUser = await admin.auth().getUser(id);
        const repo = getRepository(User);
        const user = await repo.findOneOrFail(id);
        user.email = firebaseUser.email;
        return res.send(user);
    } catch(err) {
        next(err);
    }
}

export async function addUser(req, res, next) {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty())
            throw new BadBodyError(errors);
        

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

        user.email = email;

        return res.send(true);
        

    } catch(err) {
        // TODO: delete user from firebase in case db insert fails.
        next(err);
    }
}

export async function editUser(req, res, next) {
    try {

        const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new BadBodyError(errors);
			
		}

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
        

        return res.send(true);

    } catch(err) {
        next(err);
    }
}

export async function deleteUser(req, res, next) {
    try {
        const id = req.params.id;

        await admin.auth().deleteUser(id);

        const repo = getRepository(User);

        let user = await repo.delete(id);

        return res.send(true);
    } catch(err) {
        next(err);
    }
}