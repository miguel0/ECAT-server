import 'reflect-metadata';
import {createConnection} from 'typeorm';
//import config from '../config/Database';

export async function initialize() {
    await createConnection();
}

export async function close() {}