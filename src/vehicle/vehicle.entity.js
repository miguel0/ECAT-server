//vehicle.entity.js

import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { VehicleGroup } from '../relationships/vehicle-group';

@Entity('VEHICLE')
export class Vehicle {
    @PrimaryColumn({name: 'ID', type: 'varchar2'}) id;
    @Column({name: 'NAME', type:'varchar2'}) name;
    @Column({name: 'SPNAME', type:'varchar2'}) spName;
    @Column({name: 'OTHERNAME', type:'varchar2'}) otherName;
    @Column({name: 'MODEL', type:'varchar2'}) model;
    @Column({name: 'TYP', type:'varchar2'}) type;
    @Column({name: 'MOTORCONFIG', type:'varchar2'}) motorConfig;
    @Column({name: 'MOTORPOWER', type:'int'}) motorPower;
    @Column({name: 'TRANSMISSION', type:'varchar2'}) transmission;
    @Column({name: 'IMAGEURL', type:'varchar2'}) imageURL;

    // Relations

    @OneToMany(() => VehicleGroup, vehicleGroup => vehicleGroup.vehicle)
    vehicleGroups;

}