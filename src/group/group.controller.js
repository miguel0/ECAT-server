import { getRepository } from 'typeorm';
import { Group } from './group.entity';

export async function getAllGroups(req, res) {
    const repo = getRepository(Group);
    const groups = await repo.find();
    res.send(groups);
}