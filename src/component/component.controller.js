import { getRepository } from "typeorm";
import { Component } from "./component.entity";
import { validationResult } from 'express-validator';

export async function getAllComponents(req, res) {
	try {
		const repo = getRepository(Component);
		const components = await repo.find();
		res.send(components);
	} catch(err) {
		console.log(err.message);
	}
	
}

export async function getComponent(req, res) {
	try {
		let id = req.params.id;
		const repo = getRepository(Component);
		const component = await repo.findOneOrFail({id: id}, {relations: ['componentParts', 'componentParts.part']});
		component.parts = getPrettyParts(component.componentParts);
		component.componentParts = undefined;
		res.send(component);
	} catch(err) {
		console.log(err.message);
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

export async function editComponent(req, res) {
	try {
		const id = req.params.id;
		const repo = getRepository(Component);
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });

			return;
		  }

		const {name, chName, spName, otherName} = req.body;

		

		await repo.update(id, {
			name: name,
			chName: chName,
			spName: spName,
			otherName: otherName,
		});

		res.send(true);
	} catch(err) {
		console.log("this");
		res.send(err.message); 
	}
}