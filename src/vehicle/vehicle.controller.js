import { getRepository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleGroup } from '../relationships/vehicle-group/vehicle-group.entity';
import { Group } from '../group/group.entity';
import { GroupComponent } from '../relationships/group-component/group-component.entity';
import { Component } from '../component/component.entity';
import { ComponentPart } from '../relationships/component-part/component-part.entity';
import { Part } from '../part/part.entity';
import { validationResult } from 'express-validator';
import { BadBodyError } from '../exceptions/exceptions';

export async function getVehicle(req, res, next) {
    try {
        let id = req.params.id;
        const repo = getRepository(Vehicle);
        const vehicle = await repo.findOneOrFail({id: id}, {relations: ['vehicleGroups', 'vehicleGroups.group']});
        vehicle.groups = getPrettyGroups(vehicle.vehicleGroups);
        vehicle.vehicleGroups = undefined;
        return res.send(vehicle);
    } catch(err) {
        next(err);
    }
}

export async function getAllVehicles(req, res, next) {
    try {
        const repo = getRepository(Vehicle);
        const vehicles = await repo.find();
        return res.send(vehicles);
    } catch(err) {
        next(err);
    }
}

export async function addVehicle(req, res) {
	try {
		console.log('Adding vehicle...');
		
		const id = req.params.id;
		const repo = getRepository(Vehicle);

		const {name, spName, otherName, model, type, motorConfig, motorPower, transmission, groups} = req.body;

		const exists = await repo.findOne(id);
		if (exists) {
			const vgRepo = getRepository(VehicleGroup);
			await vgRepo.delete({ vehicleId: id });

			await repo.update(id, {
				name: name,
				spName: spName,
				otherName: otherName,
				model: model,
				type: type,
				motorConfig: motorConfig,
				motorPower: motorPower,
				transmission: transmission
			});
		} else {
			await repo.insert({
				id: id,
				name: name,
				spName: spName,
				otherName: otherName,
				model: model,
				type: type,
				motorConfig: motorConfig,
				motorPower: motorPower,
				transmission: transmission
			});
		}

		for (let i = 0; i < groups.length; i++) {
			await addGroup(id, groups[i]);
		}

		console.log('Done adding the vehicle.');

		res.send(true);
	} catch(err) {
		res.send(err.message);
	}
}

export async function editVehicle(req, res, next) {
	try {
        const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new BadBodyError(errors);
        }

		const id = req.params.id;
        const repo = getRepository(Vehicle);

        const {name, spName, otherName, model, type, motorConfig, motorPower, transmission} = req.body;
        
        await repo.findOneOrFail(id);

		await repo.update(id, {
            name: name,
            spName: spName,
            otherName: otherName,
            model: model,
            type: type,
            motorConfig: motorConfig,
            motorPower: motorPower,
            transmission: transmission
		});
        
		return res.send(true);
	} catch(err) {
		next(err);
	}
}

export async function editVehicleImage(req, res) {
    try {
        const id = req.params.id;
        const repo = getRepository(Vehicle);

        const imageUrl = req.body;

        await repo.update(id, {
            imageUrl: imageUrl
        });

        res.send(true);
    } catch(err) {
        res.send(err.message);
    }
}

function getPrettyGroups(vehicleGroups) {
    let groups = [];
    let temp = {};
    vehicleGroups.forEach(vg => {
        if(vg) {
            temp = vg.group;
            if(temp) {
                temp.localNo = vg.localNo;
                groups.push(temp);
            }
        }
        temp = {};
    });
    return groups;
}

async function addGroup(vehicleId, group) {
	const repo = getRepository(Group);
	const repoRel = getRepository(VehicleGroup);

	const {name, spName, chName, otherName, localNo, components} = group;

	const added = await repo.insert({
		name: name,
		spName: spName,
		chName: chName,
		otherName: otherName
	});
	const addedId = added.identifiers[0].id;

	await repoRel.insert({
		vehicleId: vehicleId,
		groupId: addedId,
		localNo: localNo
	});

	for (let i = 0; i < components.length; i++) {
		await addComponent(addedId, components[i]);
	}
}

async function addComponent(groupId, component) {
	const repo = getRepository(Component);
	const repoRel = getRepository(GroupComponent);

	const {name, spName, chName, otherName, localNo, parts} = component;

	const added = await repo.insert({
		name: name,
		spName: spName,
		chName: chName,
		otherName: otherName
	});
	const addedId = added.identifiers[0].id;

	await repoRel.insert({
		groupId: groupId,
		componentId: addedId,
		localNo: localNo
	});

	for (let i = 0; i < parts.length; i++) {
		parts[i].originalLocalNo = parts[i].localNo;
	}

	let parentsIds = {};
	while (parts.length > 0) {
		for (let i = 0; i < parts.length; i++) {
			if (!parts[i].localNo.includes(".")) {
				const addedRelId = await addPart(
					addedId,
					parts[i],
					parts[i].originalLocalNo.includes(".") ?
						parentsIds[parts[i].originalLocalNo.substring(0, parts[i].originalLocalNo.lastIndexOf('.'))] : ''
				);

				parentsIds[parts[i].originalLocalNo] = addedRelId;
				parts.splice(i--, 1);
			}
		}

		for (let i = 0; i < parts.length; i++) {
			parts[i].localNo = parts[i].localNo.substring(parts[i].localNo.indexOf('.') + 1, parts[i].localNo.length);
		}
	}
}

async function addPart(componentId, part, parentId) {
	const repo = getRepository(Part);
	const repoRel = getRepository(ComponentPart);

	const {id, replaceNo, name, spName, chName, otherName, localNo, localQty, remark} = part;

	let relId = '';

	try {
		const findResult = await repo.findOne(id);

		if (!findResult) {
			await repo.insert({
				id: id,
				replaceNo: replaceNo,
				name: name,
				spName: spName,
				chName: chName,
				otherName: otherName
			});		
		}

		const addedRel = await repoRel.insert({
			componentId: componentId,
			partId: id,
			componentPartId: parentId,
			localNo: localNo,
			localQty: localQty,
			remark: remark
		});

		relId = addedRel.identifiers[0].id;
	} catch (err) {
	} finally {
		return relId;
	}
}