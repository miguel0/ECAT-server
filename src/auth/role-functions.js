import schema from './schema';

function hasPermission(role, permission) {
    return schema[role].permissions[permission] !== undefined;
}

function enforcePolicies(role, permission, bearer, params) {

    let policies = schema[role].permissions[permission].policies;
    if(policies) {

        for(let p of policies) {
            if(p(bearer, params)) {
                return true;
            }
        }
        return false;
    }
    
    return true;
    
 }

export function authorize(role, permission, bearer, params) {
    if (hasPermission(role, permission)) {
        return enforcePolicies(role, permission, bearer, params);
    }

    return false;

}



