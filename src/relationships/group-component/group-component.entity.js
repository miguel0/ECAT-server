import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Component } from "../../component/component.entity";
import { Group } from "../../group/group.entity";

@Entity('GRPCOMPONENT')
export class GroupComponent {

    @PrimaryGeneratedColumn({name: 'ID', type: 'int'})
    id;

    @Column({name: 'GRPID', type: 'int'})
    groupId;

    @Column({name: 'COMPONENTID', type: 'int'})
    componentId;

    @Column({name: 'LOCALNO', type: 'int'})
    localNo;

    @ManyToOne(() => Group, group => group.groupComponents)
    @JoinColumn({name: 'GRPID'})
    group;

    @ManyToOne(() => Component, component => component.groupComponents)
    @JoinColumn({name: 'COMPONENTID'})
    component;

}