const http = require('http');
const express = require('express')
const config = require('../config/WebServer.js');
const morgan = require('morgan')

let hrrpServer;

function initialize() {
    return new Promise((resolve, reject) => {
        const app = express();
        app.use(morgan('combined'))
        httpServer = http.createServer(app);
        app.get('/', (req, res) => {
            res.end('Now the true battle begins');
        });
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

module.exports.initialize = initialize;
module.exports.close = close;