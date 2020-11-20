import * as admin from 'firebase-admin';
import {getRepository} from 'typeorm';
import { User } from '../user/user.entity';
import { authorize } from './role-functions';

async function isAuthorized(bearer, permission, req) {
  try {
    const repo = getRepository(User);
    const user = await repo.findOneOrFail(bearer.uid);
    let role = user.role;

	return authorize(role, permission, user, req.params);
  } catch {
	return false;
  }
}

export function isAuthenticated(permission) {
  return async (req, res, next) => {
    
    let bearerToken = getAuthToken(req);
    let bearer = await tokenIsVerified(bearerToken);
	let authorization = await isAuthorized(bearer, permission, req);

    if(bearer && authorization) {
      return next();
	}
	
	res.status(403);
	return res.send({message:"Invalid token."});
  }
}

function getAuthToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
}

async function tokenIsVerified(token) {
  try {
    let user =  await admin.auth().verifyIdToken(token);
    return user;
  } catch(_) {
    return false;
  }
}