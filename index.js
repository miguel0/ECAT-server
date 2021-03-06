import dotenv from 'dotenv';
dotenv.config();
import * as webServer from './services/WebServer';
import * as dbConfig from './config/Database.js';
import * as database from './services/Database.js';
import * as firebase from './services/Firebase';

process.env.UV_THREADPOOL_SIZE = dbConfig.pool.poolMax + 4;

async function startup() {

    console.log('Initializing database connection...');
    try {
        await database.initialize();
    } catch(err) {
        console.log('Failed to connect uwu', err);
        process.exit(-1);
    }

    console.log("Initializing firebase connection...");
    try {
        await firebase.initialize();
    } catch(err) {
        console.log(err);
        process.exit(-1);
    }


    console.log('Initializing web server....');
    try {
        await webServer.initialize();

    } catch(error) {
        console.log(error);
        process.exit(-1);
    }
}

async function shutdown(e) {
    let err = e;
    console.log('Shutting down db connection...');
    try { 
        await database.close();
    } catch(e) {
        err = err || e;
        console.log('Failed to close db connection', e);
    }

    try {
        await webServer.close();
    } catch (err) {
        console.log('Failed to shutdown', e);
        err = err || e;
    }

    console.log('Terminating process');
    if(err) {
        process.exit(-1);
    } else {
        process.exit(0);
    }
}

process.on('SIGTERM', () => {
    shutdown();
});

process.on('SIGINT', () => {
    shutdown();
});

process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception', err);
    shutdown();
})

startup();