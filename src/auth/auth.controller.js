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