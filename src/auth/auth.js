const admin = require('firebase-admin');

admin.initializeApp(
  admin.credential.applicationDefault(),
  'https://aklhqlazpqyucjk-ecatdb.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/_sdw/'
);

module.exports = admin;