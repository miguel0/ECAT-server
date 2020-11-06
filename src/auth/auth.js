import * as admin from 'firebase-admin';

export async function createUser(req, res) {
  try {
    console.log(process.env.ORCL_CONN);
    console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);

    const {email, password} = req.body;

    let user = await admin.auth().createUser({
      email: email, 
      password: password
    });

    res.send(user);
  } catch(err) {
    res.send(err.message);
  }
  
}

export async function isAuthenticated(req, res, next) {
  let bearerToken = getAuthToken(req);
  if(await tokenIsVerified(bearerToken)) {
    return next();
  }
  res.status(403);
  return res.send({message:"Unauthorized access."});
}

// 
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