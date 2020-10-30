const { Component } = require("./src/component/component.entity");
const { Group } = require("./src/group/group.entity");
const { Part } = require("./src/part/part.entity");
const { ComponentPart } = require("./src/relationships/component-part/component-part.entity");
const { GroupComponent } = require("./src/relationships/group-component/group-component.entity");
const { VehicleGroup } = require("./src/relationships/vehicle-group/vehicle-group.entity");
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