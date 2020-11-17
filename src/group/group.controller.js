import { group } from 'console';
import { getRepository } from 'typeorm';
import { Group } from './group.entity';

export async function getGroup(req, res) {
    try {
        let id = req.params.id;
        const repo = getRepository(Group);
        const group = await repo.findOneOrFail(
            {id: id}, 
            {relations: ['groupComponents', 'groupComponents.component']}
        );
        group.components = getPrettyComponents(group.groupComponents);
        group.groupComponents = undefined;
        res.send(group);
    } catch(err) {
        res.send(err.message);
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

export async function editGroup(req, res) {
	try {
		const id = req.params.id;
		const repo = getRepository(Group);

		const {name, chName, spName, otherName} = req.body;

		await repo.update(id, {
			name: name,
			chName: chName,
			spName: spName,
			otherName: otherName,
		});

		res.send(true);
	} catch(err) {
		res.send(err.message);
	}
}