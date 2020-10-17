const typeorm = require('typeorm');
const EntitySchema = typeorm.EntitySchema;

module.exports = {
    type: "oracle",
    username: process.env.ORCL_USERNAME,
    password: ORCL_PASSWORD,
    connectString: ORCL_CONNECT_STRING,
    entities: [
        new EntitySchema(require('./src/entities/fighter'))
    ],
    synchronize: false
    

}