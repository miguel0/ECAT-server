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

		const {replaceNo, name, chName, spName, otherName, imageURL} = req.body;

		await repo.update(id, {
			replaceNo: replaceNo,
			name: name,
			chName: chName,
			spName: spName,
			otherName: otherName,
			imageURL: imageURL
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