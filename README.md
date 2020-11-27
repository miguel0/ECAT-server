# ECAT-server

REST API backend for e-catalog web application. Made with [NodeJS](https://nodejs.org) and the [Express](https://expressjs.com/) web framework. Authentication is managed with [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup). [TypeORM](https://typeorm.io) is used to manage database actions in an easy way. 

### Run the project

##### Install all required dependencies:
```
npm i
```

##### Run the server (defaults to localhost:3000):
```
npm start
```

##### You will need to have nodemon installed globally in your system. To do so, run:
```
npm i -g nodemon
```

### Database Configuration (Oracle)
This project connects to an Oracle database with the use of Oracle Wallet. You will need to have the wallet directory on your environment and do the following:

##### Set the following environment variables as requested on ormconfig.js on the project files:
```
ORCL_USERNAME={admin goes here}
ORCL_PASSWORD={password goes here}
ORCL_CONN={any of the variables available on tnsnames.ora available in your wallet directory}
```

##### Set the following environment variable:
```
TNS_ADMIN = {the absolute path to your wallet directory i.e. /home/user/Wallet_ECATDB}
```

##### On sqlnet.ora file found in your wallet directory, update the latter portion of the first line (namely, the DIRECTORY variable) with the absolute path to the wallet (the same value as TNS_ADMIN):
```
(DIRECTORY="/home/user/Wallet_ECATDB")
```

### Firebase Admin SDK setup
Follow the setup instructions to install the firebase-admin sdk on the server [here](https://firebase.google.com/docs/admin/setup). Basically, you will need a firebase project, generate a private key, have the private key in your environment, and reference it with an environment variable:
```
GOOGLE_APPLICATION_CREDENTIALS={path to your firebase private key}
```

### Additional configuration
The server has a [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) configuration that specifies a single allowed origin set by the following environment variable:
```
FRONTEND_ORIGIN=https://myapplication.com
```
Note: Errors may occur if you leave a trailing '/' at the end of your origin.

For a development environment, it may be desired to allow all origins with CORS for practical purposes. To do so, change the CORS configuration found in:
```
/services/WebServer.js
```
### Environment Variables Summary
Here are all the environment variables needed for the setup:
```
ORCL_USERNAME={admin goes here}
ORCL_PASSWORD={password goes here}
ORCL_CONN={any of the variables available on tnsnames.ora available in your wallet directory}
TNS_ADMIN = {the absolute path to your wallet directory i.e. /home/user/Wallet_ECATDB}
GOOGLE_APPLICATION_CREDENTIALS={path to your firebase private key}
FRONTEND_ORIGIN=https://myapplication.com (URL of frontend application)
```
