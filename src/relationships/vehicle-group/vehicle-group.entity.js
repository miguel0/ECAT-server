import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import { RelationCountMetadata } from "typeorm/metadata/RelationCountMetadata";
import { Group } from "../../group/group.entity";
import { Vehicle } from "../../vehicle/vehicle.entity";

@Entity('VEHICLEGRP')
export class VehicleGroup {

    @PrimaryGeneratedColumn({name: 'ID', type: 'int'})
    id;

    @Column({name: 'VEHICLEID', type: 'varchar2'})
    vehicleId;

    @Column({name: 'GRPID', type: 'int'})
    groupId;

    @Column({name: 'LOCALNO', type: 'varchar2'})
    localNo;

    @ManyToOne(() => Vehicle, vehicle => vehicle.vehicleGroups)
    @JoinColumn({name: 'VEHICLEID'})
    vehicle;

    @ManyToOne(() => Group, group => group.vehicleGroups)
    @JoinColumn({name: 'GRPID'})
    group;

}