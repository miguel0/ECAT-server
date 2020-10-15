const admin = require('firebase-admin');

admin.initializeApp(
  {
    credential: admin.credential.applicationDefault()
  }
);

async function createUser(req, res) {
  const {email, password} = req.body;

  user = await admin.auth().createUser({
    email: email, 
    password: password
  });

  res.send(user);
}

module.exports.admin = admin;
module.exports.createUser = createUser;