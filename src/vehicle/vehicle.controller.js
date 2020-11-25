import { getRepository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
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