//vechicle.controller.js
import { getRepository } from 'typeorm';
import { Vehicle } from './vehicle.entity';

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