module.exports = {
    pool: {
        user: process.env.ORCL_USER,
        password: process.env.ORCL_PWD,
        connectionString: process.env.ORCL_CONN,
        poolMin: 10,
        poolMax: 10,
        poolIncrement: 0
    }
}