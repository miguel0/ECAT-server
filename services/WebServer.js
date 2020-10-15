const http = require('http');
const express = require('express')
const config = require('../config/WebServer.js');
const morgan = require('morgan');

// Routes
const parts = require('../src/part/route');
const components = require('../src/component/route');

let app;
let httpServer;

function initialize() {
    return new Promise((resolve, reject) => {
        app = express();
        app.use(morgan('combined'))
        httpServer = http.createServer(app);
        registerRoutes();
        httpServer.listen(config.port)
            .on('listening', () => {
                console.log('Web server on, listening on port: ' +  config.port);
                resolve();
            })
            .on('error', (error) => {
                console.log(error);
                reject(error);
            })
    })
}

function close() {
    return new Promise((resolve, reject) => {
        httpServer.close((err) => {
            if(err){
                reject(err);
                return;
            }

            resolve();
        })
    })
}

function registerRoutes() {
    // Root
    app.get('/', (req, res) => {
        res.end('Welcome to ECAT server');
    });

    // Register imported routes.
    app.use('/parts', parts);
    app.use('/components', components);
}

module.exports.initialize = initialize;
module.exports.close = close;