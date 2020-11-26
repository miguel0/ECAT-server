import { getRepository } from "typeorm";
import { Component } from "./component.entity";
import { validationResult } from 'express-validator';
import { BadBodyError } from "../exceptions/exceptions";

export async function getAllComponents(req, res, next) {
	try {
		const repo = getRepository(Component);
		const components = await repo.find();
		return res.send(components);
	} catch(err) {
		next(err);
	}
}

export async function getComponent(req, res, next) {
	try {
		let id = req.params.id;
		const repo = getRepository(Component);
		const component = await repo.findOneOrFail({id: id}, {relations: ['componentParts', 'componentParts.part']});
		component.parts = getPrettyParts(component.componentParts);
		component.componentParts = undefined;
		return res.send(component);
	} catch(err) {
		next(err);
	}
	
}

function getPrettyParts(componentParts) {
	// TODO: Nest child parts in parents.
	let parts = [];
	let temp = {};

	componentParts.forEach(cp => {
		temp = cp.part;
		temp.cpid = cp.id;
		temp.localQty = cp.localQty;
		temp.remark = cp.remark;

		temp.localNo = getLocalNo(cp, componentParts, '');

		parts.push(temp);
		temp = {};
	})

	return parts;
}

function getLocalNo(cp, list, localNo) {
	let tempNo = cp.localNo.toString() + localNo;

	if(cp.componentPartId) {
		for(let i = 0; i < list.length; i++) {
			if(list[i].id === cp.componentPartId) {
				return getLocalNo(list[i], list, '.' + tempNo);
			}
		}
		return tempNo;
	} else {
		return tempNo;
	}
}

export async function editComponent(req, res, next) {
	try {

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new BadBodyError(errors);
			
		}

		const id = req.params.id;
		const repo = getRepository(Component);

		const {name, chName, spName, otherName, imageURL} = req.body;

		await repo.findOneOrFail(id);

		await repo.update(id, {
			name: name,
			chName: chName,
			spName: spName,
			otherName: otherName,
			imageURL: imageURL
		});

		return res.send(true);

	} catch(err) {
		next(err);
	}
}