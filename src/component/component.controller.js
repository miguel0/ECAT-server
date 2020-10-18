import { getRepository } from "typeorm";
import { Component } from "./component.entity";

export async function getAllComponents(req, res) {
    const repo = getRepository(Component);
    const components = await repo.find();
    res.send(components);
}