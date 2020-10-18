const { Component } = require("./src/component/component.entity");
const { Part } = require("./src/part/part.entity");

module.exports = {
    type: "oracle",
    username: process.env.ORCL_USERNAME,
    password: process.env.ORCL_PASSWORD,
    connectString: process.env.ORCL_CONN,
    entities: [
        Part,
        Component
    ]
}