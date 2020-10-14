const oracle = require('oracledb');
const dbConfig = require('../config/Database.js');

async function initialize() {
    const pool = await oracle.createPool(dbConfig.pool);
}

async function close() {
    oracle.getPool().close();
}

module.exports.initialize = initialize;
module.exports.close = close;