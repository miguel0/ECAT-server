const admin = require('./auth.js');


module.exports = createUser = async function(req, res) {

    const {
      email,
      password
    } = req.body;

    const user = await admin.auth().createUser({
      email: 'viczaz99@hotmail.com',
      password: 'Jojos#00'
    });

    return res.send(user);
};