//vechicle.controller.js
import { getRepository } from 'typeorm';
import { Vehicle } from './vehicle.entity';

export async function getVehicle(req, res) {
    try {
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