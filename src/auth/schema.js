import users from '../user/user.permissions';
import components from '../component/component.permission';
<<<<<<< HEAD
import vehicles from '../vehicle/vehicle.permissions';
=======
import parts from '../part/part.permissions';
import groups from '../group/group.permissions';
import parts from '../part/part.permissions';
import vehicles from '../vehicle/vehicle.permissions';
import compPart from '../relationships/component-part/component-part-permission';
>>>>>>> 2e53613db4477ea3805ca3ccc622a8b409bcb8c6

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
			[components.getAll]: {},
			[components.get]: {},
<<<<<<< HEAD
=======
			[groups.get]: {},
			[parts.getAll]: {},
			[parts.get]: {},
>>>>>>> 2e53613db4477ea3805ca3ccc622a8b409bcb8c6
			[vehicles.getAll]: {},
			[vehicles.get]: {}
        },
    },
    A: {
        name: 'admin',
        extends: 'C',
        permissions: {
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
			[components.edit]: {},
<<<<<<< HEAD
			[vehicles.add]: {},
			[vehicles.edit]: {}
=======
			[groups.edit]: {},
			[parts.add]: {},
			[parts.edit]: {},
			[vehicles.add]: {},
			[vehicles.edit]: {},
			[compPart.delete]: {}
>>>>>>> 2e53613db4477ea3805ca3ccc622a8b409bcb8c6
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



