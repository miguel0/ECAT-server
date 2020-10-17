//part.controller.js
const {name: fighter} = require('../entities/fighter');
const {getRepository} = require('typeorm');

async function test(req, res) {
    try {
        let character = await getRepository(fighter)
            .create(
                {name: "ZeroSuitSamus", 
                type: "rushdown"
            });
        let results = await getRepository(fighter).save(character);
        res.send(results);
    } catch(err) {
        res.send(err.message);
    }
    
}

async function getAllFighters(req, res) {
    try{
        let fighters = await getRepository(fighter).find();
        res.send(fighters);
    } catch(err) {
        res.send(err.message);
    }
}

module.exports.test = test;
module.exports.getAllFighters = getAllFighters;