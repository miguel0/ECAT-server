import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { Component } from "../../component/component.entity";
import { Part } from "../../part/part.entity";

@Entity('COMPONENTPART')
export class ComponentPart {

    @PrimaryGeneratedColumn({name: 'ID', type: 'int'}) 
    id;

    @Column({name: 'COMPONENTID', type: 'int'})
    componentId;

    @Column({name: 'PARTID', type: 'varchar2'})
    partId;

    @Column({name: 'CPPID', type: 'int'})
    componentPartId;

    @Column({name: 'LOCALNO', type: 'int'})
    localNo;

    @Column({name: 'LOCALQTY', type: 'int'})
    localQty;

    @Column({name: 'REMARK', type: 'varchar2'})
    remark;

    @ManyToOne(() => Component, component => component.componentParts)
    @JoinColumn({name: 'COMPONENTID'})
    component;

    @ManyToOne(() => Part, part => part.componentParts)
    @JoinColumn({name: 'PARTID'})
    part;
    
}