const webServer = require('./services/WebServer.js')
const dbConfig = require('./config/Database.js');
const database = require('./services/Database.js');

process.env.UV_THREADPOOL_SIZE = dbConfig.pool.poolMax + 4;

async function startup() {
    
    //await createConnection();
    //console.log("Database connection created!!");
    console.log('Initializing database connection...');
    try {
        await database.initialize();
    } catch(err) {
        console.log('Failed to connect', err);
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