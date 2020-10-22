import http from 'http';
import express from 'express';
import config from '../config/WebServer.js';
import morgan from 'morgan';
import cors from 'cors';

// Routes
import parts from '../src/part/part.route';
import components from '../src/component/component.route';
import auth_route from '../src/auth/auth.route';
import users from '../src/user/user.route';
import vehicles from '../src/vehicle/vehicle.route';
import groups from '../src/group/group.route';

let app;
let httpServer;

export function initialize() {
    return new Promise((resolve, reject) => {
        app = express();
        app.use(cors());
        app.use(morgan('combined'))
        app.use(express.json());
        httpServer = http.createServer(app);
        registerRoutes();
        httpServer.listen(config)
            .on('listening', () => {
                console.log('Web server on, listening on port: ' +  config);
                resolve();
            })
            .on('error', (error) => {
                console.log(error);
                reject(error);
            })
    })
}

export function close() {
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
    app.use('/auth', auth_route);
    app.use('/users', users);
    app.use('/vehicles', vehicles);
    app.use('/groups', groups);
    
}