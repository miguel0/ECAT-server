import { getRepository, createQueryBuilder } from 'typeorm';
import { ComponentPart } from '../relationships/component-part/component-part.entity';
import { GroupComponent } from '../relationships/group-component/group-component.entity';
import { VehicleGroup } from '../relationships/vehicle-group/vehicle-group.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { Part } from './part.entity';
import { validationResult } from 'express-validator';
import { BadBodyError } from '../exceptions/exceptions';

export async function getAllParts(req, res, next) {
	try {
		const repo = getRepository(Part);
		const parts = await repo.find();
		return res.send(parts);
	} catch(err) {
		next(err);
	}
	
}

export async function getPart(req, res, next) {
	try {
		const id = req.params.id;
		const repo = getRepository(Part);
		const part = await repo.findOneOrFail({id: id});
		const vehicles = await createQueryBuilder(ComponentPart, 'CP')
			.select('VG.VEHICLEID', 'id')
			.distinct(true)
			.addSelect('V.NAME', 'name')
			.innerJoin(GroupComponent, 'GC', 'CP.COMPONENTID = GC.COMPONENTID')
			.innerJoin(VehicleGroup, 'VG', 'GC.GRPID = VG.GRPID')
			.innerJoin(Vehicle, 'V', 'VG.VEHICLEID = V.ID')
			.where(`CP.PARTID = '${id}'`)
			.getRawMany();

		part.foundIn = vehicles;
		return res.send(part);
	} catch(err) {
		next(err);
	}
}

export async function editPart(req, res, next) {
	try {

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new BadBodyError(errors);
			
		}
		
		const id = req.params.id;
		const repo = getRepository(Part);

		const {replaceNo, name, chName, spName, otherName, imageURL} = req.body;

		await repo.findOneOrFail(id);

		await repo.update(id, {
			replaceNo: replaceNo,
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

export async function addPart(req, res, next) {
	try {

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new BadBodyError(errors);
        }

		const id = req.params.id;
		const {replaceNo, name, chName, spName, otherName, imageURL} = req.body;

		const repo = getRepository(Part);
		await repo.insert({
			id: id,
			replaceNo: replaceNo,
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