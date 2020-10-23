const { Component } = require("./src/component/component.entity");
const { Group } = require("./src/group/group.entity");
const { Part } = require("./src/part/part.entity");
const { ComponentPart } = require("./src/relationships/component-part");
const { GroupComponent } = require("./src/relationships/group-component");
const { VehicleGroup } = require("./src/relationships/vehicle-group");
const { User } = require("./src/user/user.entity");
const { Vehicle } = require("./src/vehicle/vehicle.entity");

module.exports = {
    type: "oracle",
    username: process.env.ORCL_USERNAME,
    password: process.env.ORCL_PASSWORD,
    connectString: process.env.ORCL_CONN,
    entities: [
        Part,
        Component,
        User,
        Vehicle,
        Group,
        VehicleGroup,
        GroupComponent,
        ComponentPart
    ]
}