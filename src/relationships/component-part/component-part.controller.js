import { getRepository } from "typeorm";
import { ComponentPart } from "./component-part.entity";

export async function deleteComponentPart(req, res) {
	try {
		const id = req.params.id;
		const repo = getRepository(ComponentPart);
		await repo.delete(id);
		res.send(true);
	} catch(err) {
		res.send(err.message);
	}
}

export async function editComponentPart(req, res) {
	try {
		const id = req.params.id;
		const { remark, localQty } = req.body;
		const repo = getRepository(ComponentPart);
		let componentPart = await repo.update(id, {
			remark: remark,
			localQty: localQty
		});
		res.send(true);
	} catch(err) {
		res.send(err.message);
	}
}

export async function getComponentPart(req, res) {
	try {
		const id = req.params.id;
		const repo = getRepository(ComponentPart);
		let componentPart = await repo.findOneOrFail(id);
		res.send(componentPart);
	} catch(err) {
		res.send(err.message);
	}
}