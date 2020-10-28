# ECAT-server

Install all dependencies:

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

##### Also, install {TODO} to prevent package-lock.json conflicts:
```
TODO
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
