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
		const id = req.params.id;
		const repo = getRepository(Part);
		const part = await repo.findOneOrFail({id: id});
		res.send(part);
	} catch(err) {
		res.send(err.message);
	}
}

export async function editPart(req, res) {
	try {
		const id = req.params.id;
		const repo = getRepository(Part);

		const {replaceNo, name, chName, spName, otherName} = req.body;

		/*if(replaceNo.length > 49){
			res.status(400);
			throw {
				"message" : "Atributo 'replaceNo' excede el limite de caracteres"
			};
		}*/
		
		if(name.length > 49){
			res.status(400);
			throw {
				"message" : "Atributo 'name' excede el limite de caracteres"
			};
		}

		if(chName.length > 49){
			res.status(400);
			throw {
				"message" : "Atributo 'chName' excede el limite de caracteres"
			};
		}

		if(spName.length > 49){
			res.status(400);
			throw {
				"message" : "Atributo 'spName' excede el limite de caracteres"
			};
		}

		if(otherName.length > 49){
			res.status(400);
			throw {
				"message" : "Atributo 'otherName' excede el limite de caracteres"
			};
		}

		await repo.update(id, {
			replaceNo: replaceNo,
			name: name,
			chName: chName,
			spName: spName,
			otherName: otherName,
		});

		res.send(true);
	} catch(err) {
		res.send(err.message);
	}
}

export async function addPart(req, res) {
	try {
		const id = req.params.id;
		const repo = getRepository(Part);

		const {replaceNo, name, chName, spName, otherName} = req.body;

		await repo.insert({
			id: id,
			replaceNo: replaceNo,
			name: name,
			chName: chName,
			spName: spName,
			otherName: otherName,
		});

		res.send(true);
	} catch(err) {
		res.send(err.message);
	}
}