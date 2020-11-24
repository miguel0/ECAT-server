import { getRepository } from 'typeorm';
import { Group } from './group.entity';
import { validationResult } from 'express-validator';
import { BadBodyError } from '../exceptions/exceptions';

export async function getGroup(req, res, next) {
    try {
        let id = req.params.id;
        const repo = getRepository(Group);
        const group = await repo.findOneOrFail(
            {id: id}, 
            {relations: ['groupComponents', 'groupComponents.component']}
        );
        group.components = getPrettyComponents(group.groupComponents);
        group.groupComponents = undefined;
        return res.send(group);
    } catch(err) {
        next(err);
    }
    
}

function getPrettyComponents(groupComponents) {
    let components = [];
    let temp = {};
    groupComponents.forEach(gc => {
        temp = gc.component;
        temp.localNo = gc.localNo;
        components.push(temp);
        temp = {};
    });
    return components;
}

export async function editGroup(req, res, next) {
	try {

        const errors = validationResult(req);

		if (!errors.isEmpty()) {
			throw new BadBodyError(errors);
        }
        
		const id = req.params.id;
        const repo = getRepository(Group);

        const {name, chName, spName, otherName} = req.body;
        
        await repo.findOneOrFail(id);

		await repo.update(id, {
			name: name,
			chName: chName,
			spName: spName,
			otherName: otherName,
		});

		return res.send(true);
	} catch(err) {
		next(err);
	}
}