import admin from 'firebase-admin';

admin.initializeApp(
  {
    credential: admin.credential.applicationDefault()
  }
);

export async function createUser(req, res) {
  const {email, password} = req.body;

  user = await admin.auth().createUser({
    email: email, 
    password: password
  });

  res.send(user);
}
export {admin};