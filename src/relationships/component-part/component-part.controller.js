import { validationResult } from "express-validator";
import { getRepository } from "typeorm";
import { BadBodyError } from "../../exceptions/exceptions";
import { ComponentPart } from "./component-part.entity";

export async function deleteComponentPart(req, res, next) {
	try {
		const id = req.params.id;
		const repo = getRepository(ComponentPart);
		await repo.delete(id);
		return res.send(true);
	} catch(err) {
		next(err);
	}
}

export async function editComponentPart(req, res, next) {
	try {

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new BadBodyError(errors);
		}
		
		const id = req.params.id;
		const { remark, localQty } = req.body;
		const repo = getRepository(ComponentPart);

		await repo.findOneOrFail(id);

		let componentPart = await repo.update(id, {
			remark: remark,
			localQty: localQty
		});
		return res.send(true);
	} catch(err) {
		next(err);
	}
}

export async function getComponentPart(req, res, next) {
	try {
		const id = req.params.id;
		const repo = getRepository(ComponentPart);
		let componentPart = await repo.findOneOrFail(id);
		return res.send(componentPart);
	} catch(err) {
		next(err);
	}
}