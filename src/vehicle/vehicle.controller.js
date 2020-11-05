//vechicle.controller.js
import { getRepository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleGroup } from '../relationships/vehicle-group/vehicle-group.entity';
import { Group } from '../group/group.entity';
import { GroupComponent } from '../relationships/group-component/group-component.entity';
import { Component } from '../component/component.entity';
import { ComponentPart } from '../relationships/component-part/component-part.entity';
import { Part } from '../part/part.entity';

export async function getVehicle(req, res) {
    try {
        //return res.status(400).json({message: "Something happened..."});
        let id = req.params.id;
        const repo = getRepository(Vehicle);
        const vehicle = await repo.findOneOrFail({id: id}, {relations: ['vehicleGroups', 'vehicleGroups.group']});
        vehicle.groups = getPrettyGroups(vehicle.vehicleGroups);
        vehicle.vehicleGroups = undefined;
        res.send(vehicle);
    } catch(err) {
        res.end(err.message);
    }
    
}

export async function getAllVehicles(req, res) {
    try {
        const repo = getRepository(Vehicle);
        const vehicles = await repo.find();
        res.send(vehicles);
    } catch(err) {
        res.end(err.message);
    }
}

export async function addVehicle(req, res) {
	try {
		const id = req.params.id;
		const repo = getRepository(Vehicle);

		const {name, spName, otherName, model, type, motorConfig, motorPower, transmission, groups} = req.body;

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

		let result = true;
		for (let i = 0; i < groups.length; i++) {
			if (!addGroup(id, groups[i])) {
				result = false;
				break;
			}
		}

		res.send(result);
	} catch(err) {
		res.send(err.message);
	}
}

function getPrettyGroups(vehicleGroups) {
    let groups = [];
    let temp = {};
    vehicleGroups.forEach(vg => {
        temp = vg.group;
        temp.localNo = vg.localNo;
        groups.push(temp);
        temp = {};
    });
    return groups;
}

async function addGroup(vehicleId, group) {
	const repo = getRepository(Group);
	const repoRel = getRepository(VehicleGroup);

	const {name, spName, chName, otherName, localNo, components} = group;

	const addedGroup = await repo.insert({
		name: name,
		spName: spName,
		chName: chName,
		otherName: otherName
	});

	await repoRel.insert({
		vehicleId: vehicleId,
		groupId: addedGroup.id,
		localNo: localNo
	});

	for (let i = 0; i < components.length; i++) {
		if (!addComponent(addedGroup.id, components[i])) {
			return false;
		}
	}

	return true;
}

async function addComponent(groupId, component) {
	const repo = getRepository(Component);
	const repoRel = getRepository(GroupComponent);

	const {name, spName, chName, otherName, localNo, parts} = component;

	const addedComponent = await repo.insert({
		name: name,
		spName: spName,
		chName: chName,
		otherName: otherName
	});

	await repoRel.insert({
		groupId: groupId,
		componentId: addedComponent.id,
		localNo: localNo
	});

	for (let i = 0; i < parts.length; i++) {
		parts[i].originalLocalNo = parts[i].localNo;
	}

	let parentsIds = {};
	while (parts.length > 0) {
		for (let i = 0; i < parts.length; i++) {
			if (!parts.localNo.includes(".")) {
				if (!addPart(addedComponent.id, parts[i],
					parentsIds[parts[i].originalLocalNo.substring(0, parts[i].originalLocalNo.lastIndexOf('.'))])
				   ) {
					return false;
				} else {
					parentsIds[parts[i].originalLocalNo] = parts[i].id;
					parts.splice(i--, 1);
				}
			}
		}

		for (let i = 0; i < parts.length; i++) {
			parts[i].localNo.substring(parts[i].localNo.indexOf('.') + 1, parts[i].localNo.length);
		}
	}

	return true;
}

async function addPart(componentId, part, parentId) {
	const repo = getRepository(Part);
	const repoRel = getRepository(ComponentPart);

	const {id, replaceNo, name, spName, chName, otherName, localNo, localQty, remark} = part;

	await repo.insert({
		id: id,
		replaceNo: replaceNo,
		name: name,
		spName: spName,
		chName: chName,
		otherName: otherName
	});

	await repoRel.insert({
		componentId: componentId,
		partId, id,
		componentPartId: parentId ? parentId : '',
		localNo: localNo,
		localQty: localQty,
		remark: remark
	});

	return true;
}