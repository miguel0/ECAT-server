//part.controller.js
//const { character } = require("../entities/character");
const {getRepository} = require('typeorm');

async function test(req, res) {
    console.log("welcome!!");
    let character = await getRepository("character")
        .create(
            {name: "ZeroSuitSamus", 
            type: "rushdown"
        });
    console.log("character created!");
    let results = await getRepository("character").save(character);
    console.log("saved!");
    res.send("results");
}

module.exports.test = test;