import { getRepository } from "typeorm";
import { ComponentPart } from "./component-part.entity";

export async function deleteComponentPart(req, res) {
	try {
		const id = req.params.id;
		const repo = getRepository(ComponentPart);
	} catch(err) {
		console.log(err.message);
	}
}