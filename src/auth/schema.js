import users from '../user/user.permissions';
import components from '../component/component.permission';
import parts from '../part/part.permissions';
import groups from '../group/group.permissions';
import vehicles from '../vehicle/vehicle.permissions';
import compPart from '../relationships/component-part/component-part-permission';

let baseSchema = {
    C: {
        name: 'consultant',
        permissions: {
            // Users
            [users.get]: {
                policies: [
                    // Make sure bearer user.id is the same as requested.
                    (bearer, params) => {
                        return bearer.id === params.id;
                    }
                ] 
            },
            // Components
			[components.getAll]: {},
            [components.get]: {},
            // Groups
            [groups.get]: {},
            // Parts
			[parts.getAll]: {},
            [parts.get]: {},
            // Vehicles
			[vehicles.getAll]: {},
			[vehicles.get]: {}
        },
    },
    A: {
        name: 'admin',
        extends: 'C',
        permissions: {
            // Users
            [users.get]: {
                policies: [
                    // Admin can access any user resource.
                    (bearer, params) => {
                        return true;
                    }
                ]
            },
			[users.getAll]: {},
			[users.add]: {},
			[users.edit]: {},
            [users.delete]: {},
            //Components
            [components.edit]: {},
            // Groups
            [groups.edit]: {},
            // Parts
			[parts.add]: {},
            [parts.edit]: {},
            // Vehicles
			[vehicles.add]: {},
            [vehicles.edit]: {},
            // Component-Part
			[compPart.delete]: {},
			[compPart.get]: {},
			[compPart.edit]: {}
        }
    }
}

let isLoaded = {};

function loadSchema() {
    let roles = Object.keys(baseSchema);
    roles.forEach(role => {
        if(!isLoaded[role]) {
            aux(role);
        }
            
    });

}

function aux(role) {
    let wholeRole = baseSchema[role];
    if(wholeRole.extends) {
        if(!isLoaded[wholeRole.extends]) {
            aux(wholeRole.extends);
        }
        
        inherit(role, wholeRole.extends);
    }
    isLoaded[role] = true;
}

function inherit(role, parent) {
    let rolePerms = baseSchema[role].permissions;
    let parentPerms = baseSchema[parent].permissions;
    
    Object.keys(parentPerms).forEach(p => {
        if(rolePerms[p] === undefined) {
            rolePerms[p] = parentPerms[p];
        } else {
            rolePerms[p].policies = rolePerms[p].policies.concat(parentPerms[p].policies);
        }
    })
}

loadSchema();

export default baseSchema;
