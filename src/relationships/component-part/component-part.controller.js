import { getRepository } from "typeorm";
import { ComponentPart } from "./component-part.entity";

export async function deleteComponentPart(req, res) {
	try {
		const id = req.params.id;
		const repo = getRepository(ComponentPart);
		await repo.delete({ id: id });
	} catch(err) {
		console.log(err.message);
	}
}