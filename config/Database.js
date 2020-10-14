module.exports = {
    pool: {
        user: process.env.ORACLE_USER,
        password: process.env.ORACLE_PWD,
        connectionString: process.env.ORACLE_CONNECTION,
        poolMin: 10,
        poolMax: 10,
        poolIncrement: 0
    }
}