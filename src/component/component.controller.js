import { tmpdir } from "os";
import { getRepository } from "typeorm";
import { Component } from "./component.entity";

export async function getAllComponents(req, res) {
    try {
        const repo = getRepository(Component);
        const components = await repo.find();
        res.send(components);
    } catch(err) {
        console.log(err.message);
    }
    
}

export async function getComponent(req, res) {
    try {
        let id = req.params.id;
        const repo = getRepository(Component);
        const component = await repo.findOneOrFail({id: id}, {relations: ['componentParts', 'componentParts.part']});
        component.parts = getPrettyParts(component.componentParts);
        component.componentParts = undefined;
        res.send(component);
    } catch(err) {
        console.log(err.message);
    }
    
}

function getPrettyParts(componentParts) {
    // TODO: Nest child parts in parents.
    let parts = [];
    let temp = {};

    componentParts.forEach(cp => {
        temp = cp.part;
        temp.localNo = cp.localNo;
        temp.localQty = cp.localQty;
        temp.remark = cp.remark;
        parts.push(temp);
        temp = {};
    })

    return parts;
}